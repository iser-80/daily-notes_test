import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather  } from '@expo/vector-icons';

export default function addTaskTypeModal({ closeModal, addTaskType }) {
  const [newTaskType, setNewTaskType] = useState('')

  const addNewTaskType = () => {
    if(newTaskType){
      addTaskType(newTaskType)
      setNewTaskType('')
      closeModal()
    }else{
      Alert.alert('give a valid task type')
    }
  }

  return (
      <View className='flex-1 bg-black/30 justify-center items-center'>
        <View className='relative w-[90%] h-[85%] justify-center items-center border-2 border-b-[7px] rounded-3xl shadow-sm shadow-gray-500 bg-white'>
          <TouchableOpacity onPress={closeModal} className='absolute top-3 left-3 w-10 h-10 mt-3 ml-3 rounded-full justify-center items-center shadow-sm shadow-gray-400 bg-yellow-400'>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
          <View className='w-full mt-5 px-3 justify-center items-center'>
            <Text className='text-xl' style={{fontFamily: 'Exo-semiBold'}}>Create You Own Task Type</Text>
            <Text className='text-center text-sm mt-2 mb-2 text-gray-600' style={{fontFamily: 'Nunito-regular'}} >'Organizing life is like arranging the pieces of a puzzle - it brings clarity, reveals the bigger picture, and turns chaos into a masterpiece of purpose.'</Text>
            <Feather name="chevrons-down" size={24} color="black" />
            <TextInput 
                className='w-[90%] mt-4 px-6 py-4 text-lg border border-b-4 rounded-md text-black' 
                style={{fontFamily: 'Nunito-medium'}}
                placeholder='enter a task type' 
                onChangeText={(val) => setNewTaskType(val)}
                value={newTaskType}
            />
            <TouchableOpacity onPress={addNewTaskType} className='w-[90%] justify-center items-center mt-4 px-6 py-4 text-lg border border-b-4 rounded-md text-black bg-yellow-400'>
              <Text className='text-lg' style={{fontFamily: 'Nunito-semiBold'}} >Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
        
  )
}