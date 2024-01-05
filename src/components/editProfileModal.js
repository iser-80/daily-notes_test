import { View, Text, Modal, TouchableNativeFeedback, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Feather, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileModal({ username, profileModal, hideProfileModal, setUsername }) {
    const [updatedUsername, setUpdatedUsername] = useState(username)
    const [currentUsername, setCurrentUsername] = useState(username)

    const editProfileUsername = async () => {
        try {
            if(currentUsername && currentUsername !== updatedUsername){
                setUpdatedUsername(currentUsername)
                setUsername(currentUsername)
                await AsyncStorage.setItem('username', currentUsername)
            }else{
                Alert.alert('nothing change or invalid username')
            }
        } catch (error) {
            console.error('something went wrong when editing the profile username : ', error)
        }
    }
  
    return (
    <Modal
        visible={profileModal}
        transparent={true}
        animationType='slide'
    >
        <View className='flex-1 bg-black/30 justify-center items-center'>
            <View className='relative w-[80%] h-[70%] py-5 justify-between items-center border-2 border-b-[7px] rounded-3xl shadow-sm shadow-gray-500 bg-white' >
                <TouchableOpacity onPress={hideProfileModal} className='absolute top-3 left-3 w-8 h-8 rounded-full justify-center items-center shadow-sm shadow-gray-400 bg-amber-400'>
                    <AntDesign name="close" size={24} color="white" />
                 </TouchableOpacity>
                <View className='w-full items-center justify-center'>
                    <View className='w-[100px] h-[100px] justify-center items-center rounded-full bg-cyan-500'>
                        <Image className='w-[99%] h-[99%]' source={require('../../assets/images/profile.png')} />
                    </View>
                    <Text className='text-xl mt-2' style={{fontFamily: 'Nunito-bold'}} >Hi {updatedUsername}</Text>
                    <Text className='text-sm text-gray-700 mt-2 px-4 text-center' style={{fontFamily: 'Nunito-medium'}} >You can update your username here or not it's your choice</Text>
                </View>
                <Feather name="chevrons-down" size={24} color="black" />
                <View className='w-full justify-center items-center'>
                    <TextInput 
                        className='w-[90%] px-6 py-4 text-lg border border-b-4 rounded-md text-black' 
                        style={{fontFamily: 'Nunito-medium'}}
                        placeholder='enter you name' 
                        onChangeText={(val) => setCurrentUsername(val)}
                        value={currentUsername}
                    />
                    <TouchableOpacity onPress={editProfileUsername} className='w-[90%] mt-3 py-3 px-5 justify-center items-center bg-amber-400 border border-b-4 rounded-lg'>
                        <Text className='text-lg' style={{fontFamily: 'Nunito-semiBold'}} >Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hideProfileModal} className='w-[90%] mt-1 py-3 px-5 justify-center bg-cyan-400 items-center border border-b-4 rounded-lg'>
                        <Text className='text-lg' style={{fontFamily: 'Nunito-semiBold'}} >Cancel</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    </Modal>
  )
}