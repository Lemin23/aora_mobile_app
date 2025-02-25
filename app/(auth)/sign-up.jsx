import { Image , ScrollView, View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import InputeForm from '../../components/InputeForm'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'


const signUp = () => {
    const [form, setForm] = useState({
        email: '',
        username:'',
        password: '',
    })
    const [isSubmiting, setIsSubmiting] = useState(false)
    
    const {setUser, setIsLoggedIn} = useGlobalContext

    const Submit = async () => {
        if(!form.email || !form.username || !form.password){
            Alert("Error", "Please fill all field")
        }

        setIsSubmiting(true)
        try {
            const respons = await createUser(form.email, form.username, form.password);
            setUser(respons)
            setIsLoggedIn(true)
            router.replace('/home')
        } catch (error) {
            console.log(error); // Log the error
            Alert.alert("error", error.messsage)

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
                <Text className='text-2xl text-white text-semibold font-psemibold mt-10 '>Sign Up</Text>
                <InputeForm 
                    title = "username"
                    value = {form.username}
                    placeHolder='Enter name'
                    handleChangeText = {(e) => setForm({ ...form , username : e})}
                    otherStyle = "mt-7"
                />
                <InputeForm 
                    title = "Email"
                    value = {form.email}
                    placeHolder='Enter email'
                    handleChangeText = {(e) => setForm({ ...form , email : e})}
                    otherStyle = "mt-7"
                    keyboardType = "email-address"
                />
                <InputeForm 
                    title = "Password"
                    placeHolder="Enter password"
                    value = {form.password}
                    handleChangeText = {(e) => setForm({ ...form , password : e})}
                    otherStyle = "mt-7"
                />
                 <CustomButton 
                    title = "Sign Up"
                    containerStyles ='mt-10 w-full'
                    handlePress={Submit}
                    inLoading = {isSubmiting}
                />
                <View className='pt-5 justify-center flex-row gap-2 '>
                    <Text className='text-white text-lg font-pregular'>
                        Already have an account?
                    </Text>
                    <Link href={'./sign-in'} className='text-lg text-secondary-200 font-semibold'>Sign In</Link>
                </View>
            </View>
           
        </ScrollView>
    </SafeAreaView>
  )
}

export default signUp