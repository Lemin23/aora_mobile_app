import { View, Text, Image, TouchableOpacity} from 'react-native'
import React ,{useState} from 'react'
import { icons } from '../constants'
import { useVideoPlayer, VideoView } from 'expo-video'

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar}} }) => {
    const [play, setPlay] = useState(false)
    const player = useVideoPlayer(video , player => {
        player.loop = false
        player.pause()
    })
    return (
    <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
            <View className="w-[46] h-[46] rounded-lg border border-secondary justify-center">
                <Image 
                    source={{ uri:avatar}}
                    className="w-full h-full rounded-lg"
                    resizeMode='cover'
                />
            </View>
            <View className="justify-center flex-1 ml-3 gap-y-1">
                <Text numberOfLines={1} className="text-white font-psemibold text-sm">{title}</Text>
                <Text className="text-xs text-gray-100">{username}</Text>
            </View>
        </View>
        <View className="pt-2 ">
            <Image
                source={icons.menu}
                className="w-5 h-5"
                resizeMode='contain'
            />
        </View>
        </View>
        {play ? (
            <View className="w-full h-60 rounded-xl mt-3 overflow-hidden">
                <View className="flex-1 relative ">
                    <VideoView 
                        player={player}
                        style={{
                        width: "100%",
                        height: "100%",
                        }}
                        contentFit='contain'
                        allowsFullscreen 
                        allowsPictureInPicture
                    />
                </View>
            </View>
        ): (
            <TouchableOpacity
                className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                activeOpacity={0.4}
                onPress={() => setPlay(true)}
            >
                <Image 
                    source = {{uri:thumbnail}}
                    className="w-full h-full rounded-xl mt-3"
                    resizeMode='cover'
                /> 
                <Image 
                    source={icons.play}
                    className="w-12 h-12 absolute"
                />
            </TouchableOpacity>
        )}
    </View>
    )
}

export default VideoCard