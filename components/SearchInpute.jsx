import { TextInput, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchInpute = ({initialQuery}) => {
    const [query, setQuery] = useState( initialQuery ||  '');
    const [isFocused, setIsFocused] = useState(false);
    const pathname = usePathname()
    return (
        <View 
            className={`border-2 bg-black-100 h-20 rounded-xl w-full px-5 items-center flex-row
                ${isFocused ? 'border-secondary' : 'border-black-200'} space-x-4`} // Dynamically change border
        >
            <TextInput
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={query}
                placeholder="Search for a video topic"        
                placeholderTextColor='#CDCDE0'
                onFocus={() => setIsFocused(true)} // Set focus state to true
                onBlur={() => setIsFocused(false)}  // Set focus state to false when blurred
                onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity
                onPress={() => {
                    if(!query){
                        Alert.alert("No Topic", "Enter a topic to search for")
                    }
                    // if(pathname.startsWith('/search')) router(query)
                    else {
                        router.push(`/search/${query}`)
                    }
                }}
            >
                <Image 
                    source={icons.search}
                    className='w-6 h-6'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInpute;