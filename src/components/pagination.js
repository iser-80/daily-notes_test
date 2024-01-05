import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { data } from '../screens/welcome'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Pagination({ data, activeIndex }) {
  const navigation = useNavigation()

  const checkAuthentication = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('username')
      if(storedUser){
        navigation.navigate('Home', storedUser)
      }else{
        navigation.navigate('Authenticate')
      }
    } catch (error) {
      console.error('error white checking of user : ', error)
    }
  }

  return (
    <View className='absolute bottom-10 w-full items-center justify-center'>
        <TouchableOpacity onPress={checkAuthentication} className='w-4/5 px-6 py-4 mb-4 bg-amber-400 border border-b-4 rounded-lg'>
            <Text className='text-lg text-black text-center' style={{fontFamily: 'Nunito-semiBold'}} >Get Started</Text>
        </TouchableOpacity>
        <View className='flex-row w-full items-center justify-center'>
            {data.map((item, index) => {
            return (
                <View className='w-2 h-2 mx-1 rounded-full' style={{backgroundColor: index === activeIndex ? 'gray' : 'white'}} key={index} ></View>
            )
            })}
        </View>
      </View>
  )
}