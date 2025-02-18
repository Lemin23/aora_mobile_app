import { View, Text, FlatList, Image, TouchableOpacity,ImageBackground, Button } from 'react-native'
import React, {useState} from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { useVideoPlayer, VideoView, VideoSource } from 'expo-video'
import { useEvent } from 'expo'


const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1
  }
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  }
}

const TrendingItem = ({activeItem , item}) => {
  const [play, setPlay] = useState(false)
  
  const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const player = useVideoPlayer(videoSource, player => {
    player.loop = false
    player.pause()
  })

  const {isPlaying} = useEvent(player ,"playingChange", { isPlaying : player.playing })

  return (
    <Animatable.View
      className="mr-5"
      animation={ activeItem === item.$id ?zoomIn : zoomOut }
      duration={500}
    >
      {play ? (
        <View className="w-52 h-72 rounded-[35] mt-3 overflow-hidden">
          <View className="flex-1 relative">
            <VideoView 
              player={player}
              style={{
                width: '100%',
                height: '100%',
              }}
              contentFit='cover'
              allowsFullscreen 
              allowsPictureInPicture
            />
            <View className="absolute bottom-0 w-full p-2 bg-black/30">
              <Button
                title={isPlaying ? 'Pause' : 'Play'}
                onPress={() => {
                  if (isPlaying) {
                    player.pause();
                  } else {
                    player.play();
                  }
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity 
          className="justify-center relative items-center"
          onPress={() => setPlay(true)}
          activeOpacity={0.4}>
            <ImageBackground
              source={{ uri: item.thumbnail }}
              className="w-52 h-72 rounded-[35] my-5 overflow-hidden shadow-lg shadow-black/40"
              resizeMode="cover"
            />
            <Image 
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode='contain'
            />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}



const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemChanged = ({viewableItems}) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <TrendingItem activeItem= {activeItem} item = {item} />
        )}
        onViewableItemsChanged={viewableItemChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{ x: 170 }}
        horizontal
    />
  )
}

export default Trending