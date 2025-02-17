import { TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const SearchInpute = ({ title, value, handleChangeText, otherStyle, placeHolder, keyboardType, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false); // Track focus state

    return (
        <View 
            className={`border-2 bg-black-100 h-20 rounded-xl w-full px-5 items-center flex-row
                ${isFocused ? 'border-secondary' : 'border-black-200'} space-x-4`} // Dynamically change border
        >
            <TextInput
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={value}
                placeholder="Search for a video topic"        
                placeholderTextColor='#7b7b8b'
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
                onFocus={() => setIsFocused(true)} // Set focus state to true
                onBlur={() => setIsFocused(false)}  // Set focus state to false when blurred
            />
            <TouchableOpacity>
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