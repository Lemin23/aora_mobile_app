import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

import { router } from 'expo-router'

import CustomButton from './CustomButton'

const EmplyList = ({title, subtitle, buttonNeeded=true}) => {
  return (
    <View className='justify-center items-center px-4'>
        <Image 
            source={images.empty}
            className="w-[270px] h-[215px]"
            resizeMode='contain'
        />
        <Text className="font-pmedium text-sm text-gray-100">
            {subtitle }
        </Text>
        <Text className="font-semibold text-2xl text-white">
            {title} 
        </Text>
        {(buttonNeeded && 
          <CustomButton
          title = "Create a video"
          handlePress={() => (router.push('/create'))}
          containerStyles="w-full my-5"
        />
        )}
        
    </View>
  )
}

export default EmplyList