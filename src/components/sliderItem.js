import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'

export default function SliderItem({ item }) {
    const {width, height} = Dimensions.get('screen')

  return (
    <View className='items-center mt-[20%] px-5' style={{width, height, flex: 0.5}} >
        <Image className=' w-full h-[320px]' source={item.image} />
        <Text className='text-3xl mt-5 text-white'  style={{fontFamily: 'Exo-extraBold'}} >{item.title}</Text>  
        <Text className='text-sm text-white text-center mt-2'  style={{fontFamily: 'Nunito-medium'}} >{item.description}</Text>  
    </View>
  )
}