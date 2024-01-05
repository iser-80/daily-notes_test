import { View, Text, SafeAreaView, Button, Image, TouchableOpacity, ScrollView, Modal, TextInput, FlatListComponent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import TaskTypes from '../components/taskTypes';
import EditProfileModal from '../components/editProfileModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ route }) {
  const name = route.params
  const [username, setUsername] = useState(name)
  const [isActiveProfileModal, setIsActiveProfileModal] = useState(false)
  const [isActiveProfileMenu, setIsActiveProfileMenu] = useState(false)

  useEffect(() => {
    checkUsername()
  }, [])

  useEffect(() => {
    checkUsername()
  }, [username])

  const checkUsername = async () => {
    try {
      const name = await AsyncStorage.getItem('username')
      if(name !== username){
        setUsername(name)
      }
    } catch (error) {
      console.log('something went wrong while checking from the username')
    }
  }

  const showProfileModal = () => {
    setIsActiveProfileModal(true)
    setIsActiveProfileMenu(false)
  }

  const hideProfileModal = () => {
    setIsActiveProfileModal(false)
  }

  return (
    <SafeAreaView className='flex-1 p-5' style={{backgroundColor: '#FFFFF0'}} >
      <View className='w-full h-full mt-3 relative'>
        <View className='flex-row self-center justify-between items-center w-[98%] mt-4'>
          <View>
            <Text className='text-2xl' style={{fontFamily: 'Exo-bold'}} >Hi {username}</Text>
            <Text className='text-lg text-gray-700' style={{fontFamily: 'Nunito-semiBold'}} >Today you have 5 tasks</Text>
          </View>
          <TouchableOpacity onPress={() => setIsActiveProfileMenu(true)}>
            <Image source={require('../../assets/images/profile.png')} />
          </TouchableOpacity>
        </View>

        <Modal
          visible={isActiveProfileMenu}
          transparent={true}
        >
          <View className='flex-1 p-5'>
            <View className='mt-[19%] w-28 h-24 justify-between items-center border border-b-4 rounded-lg bg-white self-end'>
              <TouchableOpacity onPress={showProfileModal} className='w-full h-1/2 px-4 border-b flex-row items-center justify-around'>
                <Text className='text-lg' style={{fontFamily: 'Nunito-semiBold'}} >Edit</Text>
                <MaterialIcons name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsActiveProfileMenu(false)} className='w-full h-1/2 px-4 flex-row items-center justify-around'>
                <Text className='text-lg' style={{fontFamily: 'Nunito-semiBold'}} >Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <EditProfileModal 
          username={username} 
          profileModal={isActiveProfileModal} 
          hideProfileModal={hideProfileModal} 
          setUsername={setUsername}
        />

        <TaskTypes />

      </View>
    </SafeAreaView>
  )
}