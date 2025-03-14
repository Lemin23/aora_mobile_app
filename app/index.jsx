import { StatusBar } from 'expo-status-bar';
import { Image ,ScrollView ,Text, View } from 'react-native';
import { Redirect, router } from 'expo-router'
import { images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
// import 'react-native-url-polyfill/auto'

import GlobalProvider, { useGlobalContext } from '../context/globalProvider';

export default function App() {
  const {isLoading, isLoggedIn}  = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href={'/home'} />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height : '90%'}}>
        <View className="w-full items-center justify-center h-full px-4">
          <Image 
            source = {images.logo}
            className = "w-[130px] h-[84px]"
            resizeMode='contain'
          />
          <Image 
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"  
            resizeMode='contain'
          />
        
          <View className="relative mt-4">
            <Text className="text-4xl text-white font-bold text-center">
              Discover Endless Possibilities With{' '}
              <Text className="text-secondary-200">Aora</Text>          
            </Text>
            <Image 
              source={images.path}
              className="w-[170] h-[15] absolute -bottom-2 -right-14"
              resizeMode='contain'
            />
          </View>
          <Text className="font-pregular text-white text-sm text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
          <CustomButton 
            title = "Continue With Email"
            handlePress = {() => router.push("/sign-in")}          
            containerStyles = "w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor="#161622"
        style='light'
      />
    </SafeAreaView>
  );
}

