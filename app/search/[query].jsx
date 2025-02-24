import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images} from '../../constants'
import SearchInpute from '../../components/SearchInpute'
import EmplyList from '../../components/EmplyList'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
import {searchQuery} from '../../lib/appwrite'


const searchQ = () => {
  const {query} = useLocalSearchParams()

  const {data : posts, refetch} = useAppwrite(
    () => searchQuery(query)
  )
  
  useEffect( () =>{
    refetch()
  },[query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video = {item}/>
        )}
        ListHeaderComponent={
          <View className = "my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100 mb-3">Search result</Text>
            <SearchInpute initialQuery={query}/>
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

export default searchQ