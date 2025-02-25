import { View, Text, FlatList, Image, RefreshControl, Alert, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images} from '../../constants'
import EmplyList from '../../components/EmplyList'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import {getUserPosts, signOut} from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'





const Profile = () => {

  const {user, setUser, setIsLoggedIn} = useGlobalContext()
  const {data : posts, refetch} = useAppwrite(
    () => getUserPosts(user.$id)
  )  

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video = {item}/>
        )}
        ListHeaderComponent={
          <View className = "w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
             className="w-full items-end"
             onPress={logout}
             >
              <Image 
                source={icons.logout}
                resizeMode='contain'
                className="w-8 h-8"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 rounded-lg border border-secondary justify-center">
              <Image 
                  source={{ uri : user?.avatar }}
                // source={{ uri :user ? user.avatar : 'undefined'}} same as above
                  className="w-full h-full rounded-lg"
                  resizeMode='cover'
              />
            </View >
              <InfoBox
                title={user?.username}
                titleSytle="text-lg"
                containerStyle="mt-5"
              />
            <View className='mt-5 flex-row'>
              <InfoBox
                title={posts?.length || 0}
                titleSytle="text-xl "
                containerStyle='mr-10'
                subtitle="Posts"

              />
              <InfoBox
                title= '1.2k'
                titleSytle="text-xl"
                subtitle='Followers'
              />
            </View>
          </View>
        }
        ListEmptyComponent={() => (
          <EmplyList
            title= "No videos found"
            subtitle = "No video found"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile