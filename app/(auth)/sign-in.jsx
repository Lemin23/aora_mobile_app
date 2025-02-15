import { Image , ScrollView, View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import InputeForm from '../../components/InputeForm'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { SignIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'


const signIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    
    const [isSubmiting, setIsSubmiting] = useState(false)
    const {setUser, setIsLoggedIn} = useGlobalContext

    const Submit = async () => {
        if(!form.email || !form.password){
            Alert("Error", "Please fill all field")
        }

        setIsSubmiting(true)
        try {
            const session = await SignIn(form.email, form.password);
            setUser(session);
            setIsLoggedIn(true); 
            router.replace('/home')
        } catch (error) {
            console.log(error);
            Alert.alert("error",error.messsage)

        } finally {
            setIsSubmiting(false)
        }
    }
  return (
    <SafeAreaView className='bg-primary h-full '>
        <ScrollView>
            <View className='w-full  justify-center h-full px-4 my-6 items-center min-h-[65vh]'>
                <Image 
                    source={images.logo}
                    resizeMode='contain'
                    className='h-[36] w-[113] '
                />
                <Text className='text-2xl text-white text-semibold font-psemibold mt-10 '>Log in</Text>
                <InputeForm 
                    title = "Email"
                    value = {form.email}
                    placeHolder='Email'
                    handleChangeText = {(e) => setForm({ ...form , email : e})}
                    otherStyle = "mt-7"
                    keyboardType = "email-address"
                    />
                <InputeForm 
                    title = "Password"
                    placeHolder="Password"
                    value = {form.password}
                    handleChangeText = {(e) => setForm({ ...form , password : e})}
                    otherStyle = "mt-7"
                />
                 <CustomButton 
                    title = "Sign in"
                    containerStyles ='mt-10 w-full'
                    handlePress={Submit}
                    inLoading = {isSubmiting}
                />
                <View className='pt-5 justify-center flex-row gap-2 '>
                    <Text className='text-white text-lg font-pregular'>
                        Don't have account?
                    </Text>
                    <Link href={'./sign-up'} className='text-lg text-secondary-200 font-semibold'>Sign Up</Link>
                </View>
            </View>
           
        </ScrollView>
    </SafeAreaView>
  )
}

export default signIn