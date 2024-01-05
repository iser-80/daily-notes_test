import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Authenticate({ navigation }) {
  const [name, setName] = useState('')


  const handleLogin = async () => {
    try {
      if(name){
        await AsyncStorage.setItem('username', name)
        navigation.navigate('Home', name)
      }
    } catch (error) {
      console.error('error while login : ', error)
    }
  }

  return (
    <View className='flex-1 bg-yellow-100 items-center'>
      <Image className='absolute h-full w-full opacity-10' source={require('../../assets/images/background.jpg')} />
      <Image className='w-full h-[30%] mt-10' source={require('../../assets/images/hello.png')} />
      <View className='w-full items-center p-5'>
        <TextInput 
            className='w-[90%] px-6 py-4 text-lg border border-b-4 rounded-md text-black' 
            style={{fontFamily: 'Nunito-medium'}}
            placeholder='enter you name' 
            onChangeText={(val) => setName(val)}
            value={name}
        />
        <TouchableOpacity onPress={handleLogin} className='mt-10 flex-row self-end mr-[5%] items-center py-3 px-4 rounded-md border border-b-4 bg-yellow-400 shadow-md shadow-black'>
          <Text className='text-lg mr-3' style={{fontFamily: 'Nunito-semiBold'}}>Continue</Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}