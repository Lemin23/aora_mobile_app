import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title, titleSytle, containerStyle, subtitle}) => {
  return (
    <View className={containerStyle}>
        <Text className={`${titleSytle} text-white text-center font-semibold`}>{title}</Text>
        <Text className='text-sm text-gray-100 text-center font-pregular'>{subtitle}</Text>
    </View>
  )
}

export default InfoBox