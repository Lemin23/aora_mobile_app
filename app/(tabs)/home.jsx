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


const home = () => {
  const {data : posts, refetch} = useAppwrite(getAllPosts)
  const {data : latestPost} = useAppwrite(getLatestPosts)
  const [refreshing, setRefreshing] = useState(false)

  const {user} = useGlobalContext()

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
            <SearchInpute title='Search for a video'/>
            <View className = "pt-4 pb-6 flex-1 w-full">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Tending Videos
              </Text>
              <Trending posts={latestPost ?? []}/>
            </View>
          </View>
        }
        ListEmptyComponent={() => (
          <EmplyList
            title= "No videos found"
            subtitle = "Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl 
                          refreshing={refreshing}
                          onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default home