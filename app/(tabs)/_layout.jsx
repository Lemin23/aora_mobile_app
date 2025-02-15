import { View, Text, Image } from 'react-native'
import { Stack, Tabs } from 'expo-router'
import React from 'react'
import { icons } from "../../constants"


const TabIcon = ( {color , icon , focused, name} ) => {
    return (
        <View className="items-center justify-center w-16 top-3">
            <Image
                    source={icon}
                    tintColor={color}
                    resizeMode='contain'
                    className ="w-6 h-6"
                />
            <Text className={`${focused ?'font-psemibold' : 'font-pregular'} text-xs top-3`} style ={{ color: color }}>
                {name}
            </Text>
        </View>
    )
}

const layoutTab = () => {
    return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel : false,
                tabBarActiveTintColor: "#FFA001",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle : {
                    backgroundColor: "#161622",
                    borderTopWidth: 1,
                    borderTopColor: "#222533",
                    height: 84
                }
            }}
        >
            <Tabs.Screen 
                name ="home"    
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon : ({ color , focused }) => (
                        <TabIcon 
                            icon = {icons.home}
                            color = {color}
                            name = {"Home"}
                            focused = {focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name ="bookMark"    
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon : ({ color , focused }) => (
                        <TabIcon 
                            icon = {icons.bookmark}
                            color = {color}
                            name = {"Saved"}
                            focused = {focused}
                        />
                    )
                }}
                    
            />
            <Tabs.Screen 
                name ="create"    
                options={{
                    title: "Create",
                    headerShown: false,
                    tabBarIcon : ({ color , focused }) => (
                        <TabIcon 
                            icon = {icons.plus}
                            color = {color}
                            name = {"Create"}
                            focused = {focused}
                        />
                    )
                }}
                    
            />
            <Tabs.Screen 
                name ="profile"    
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon : ({ color , focused }) => (
                        <TabIcon 
                            icon = {icons.profile}
                            color = {color}
                            name = {"Profile"}
                            focused = {focused}
                        />
                    )
                }}
                    
            />
        </Tabs>
    </>
  )
}

export default layoutTab;