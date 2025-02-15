import { TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const InputeForm = ({ title, value, handleChangeText, otherStyle, placeHolder, keyboardType, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false); // Track focus state

    return (
        <View className={`space-y-2 ${otherStyle}`}>
            <Text className='text-base text-gray-100 font-pmedium mb-2'>{title}</Text>
            <View 
                className={`border-2 bg-black-100 h-20 rounded-xl w-full px-5 items-center flex-row
                    ${isFocused ? 'border-secondary' : 'border-black-200'}`} // Dynamically change border
            >
                <TextInput
                    className='flex-1 text-white font-psemibold text-base h-full'
                    value={value}
                    placeholder={placeHolder}        
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    onFocus={() => setIsFocused(true)} // Set focus state to true
                    onBlur={() => setIsFocused(false)}  // Set focus state to false when blurred
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image 
                            source={showPassword ? icons.eye : icons.eyeHide} 
                            resizeMode='contain'
                            className='w-6 h-6 h-full'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default InputeForm;