import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images} from '../../constants'
import SearchInpute from '../../components/SearchInpute'
import Trending from '../../components/Trending'
import EmplyList from '../../components/EmplyList'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/globalProvider'
import { getUserSavedPosts } from '../../lib/appwrite'

const bookMark = () => {
  const {user} = useGlobalContext()

  const {data : posts, refetch} = useAppwrite(() =>  getUserSavedPosts(user.$id))

  const [refreshing, setRefreshing] = useState(false)

  
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
          <View className = "my-6 px-4 space-y-6">
            <View className= "justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="font-semibold text-2xl text-white">{user?.username}</Text>
              </View>
              <View>
                <Image 
                  source={images.logoSmall}
                  className="w-10 h-12"
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInpute title='Seach a saved video'/>
          </View>
        }
        ListEmptyComponent={() => (
          <EmplyList
            title= "No videos found"
            buttonNeeded={false}
          />
        )}
        refreshControl={<RefreshControl 
                          refreshing={refreshing}
                          onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default bookMark