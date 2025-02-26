import { View, Text , ScrollView, TouchableOpacity, Image, Alert} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputeForm from '../../components/InputeForm'
import { icons } from '../../constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import CustomButton from '../../components/CustomButton'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'

const create = () => {
  
  const {user} = useGlobalContext()
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  })

  const [uploading, setUploading] = useState(false)

  const player = useVideoPlayer(form.video, player => {
    player.loop = false
    player.play()
  })

  const sumbit = async () => {
    setUploading(true)
    if(!form.prompt || !form.thumbnail || !form.video || !form.title){
      return Alert.alert('Please fill all fields')
    }
    try {
      await createVideo(
        {form, userId: user.$id}
      )

      Alert.alert("Success", 'Post uploaded')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
      setUploading(false)
    } 
  }

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ['images'] : ['videos'],
      aspect: [4, 3],
      quality:1

    })
    if(!result.canceled){
      if(selectType === 'image'){
        setForm({...form, thumbnail: result.assets[0]})
      }
      if(selectType === 'video'){
        setForm({...form, video: result.assets[0]})
      }
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>Upload a video</Text>

        <InputeForm
          otherStyle={'mt-10'}
          title='Video name'
          placeHolder='Choose a catchy topic...'
          handleChangeText={(e) => setForm({...form, title: (e)})}
        />

        <View className="mt-7">
          <Text className='text-base text-gray-100 font-pmedium mb-2'>Upload a video</Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <View className='w-full h-60 bg-black-100 rounded-xl justify-center border-2 border-black-200'>
              <VideoView player={player} 
                className='w-full h-40 rounded-2xl' 
                contentFit='contain'
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
              </VideoView>
              </View>
            ): (
              <View className='w-full h-40 bg-black-100 rounded-xl justify-center items-center border-2 border-black-200'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image 
                    source={icons.upload}
                    resizeMode='contain'
                    className='h-1/2 w-1/2'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
            
        </View>
          <View className='mt-7'>
            <Text className='text-base text-gray-100 font-pmedium mb-2'>Thumbnail Image</Text>
            <View className='w-full bg-black-100 rounded-xl justify-center border-2 border-black-200'>
              <TouchableOpacity onPress={() => openPicker('image')}>
                {form.thumbnail ? (
                  <Image 
                    source={{uri: form.thumbnail.uri}}
                    resizeMode='cover'
                    className='w-full h-60 rounded-2xl'
                  />
                ): (
                  <View className='w-full bg-black-100 rounded-xl justify-center items-center flex-row'>
                    <View className='w-12 h-12 justify-center items-center'>
                      <Image 
                        source={icons.upload}
                        resizeMode='contain'
                        className='h-5 w-5'
                      />
                    </View>
                      <Text className='text-gray-100 text-sm font-pmedium pl-2'> Choose a file</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <InputeForm
              value={form.prompt}
              otherStyle={'mt-7'}
              title='AI Prompt'
              placeHolder='Prompt that generated this video'
              handleChangeText={(e) => setForm({...form, prompt: (e)})}
            />

            <CustomButton
              title = 'Submit & Publish'
              containerStyles='mt-10'
              textStyles=''
              handlePress={sumbit}
              isLoading={uploading}
            />
          </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default create