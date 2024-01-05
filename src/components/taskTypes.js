import { View, Text, ScrollView, TouchableOpacity, FlatList, Modal, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddTaskTypeModal from './addTaskTypeModal'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TaskTypes() {
    const [tasktypes, setTaskTypes] = useState([])
    const [isActiveModal, setIsActiveModal] = useState(false)
    
    const navigation = useNavigation()

    const imagePaths = {
      1: require('../../assets/stickers/sticker1.png'),
      2: require('../../assets/stickers/sticker2.png'),
      3: require('../../assets/stickers/sticker3.png'),
      4: require('../../assets/stickers/sticker4.png'),
      5: require('../../assets/stickers/sticker5.png'),
      6: require('../../assets/stickers/sticker6.png'),
      7: require('../../assets/stickers/sticker7.png'),
      8: require('../../assets/stickers/sticker8.png'),
      9: require('../../assets/stickers/sticker9.png'),
      10: require('../../assets/stickers/sticker10.png'),
    };

    useEffect(() => {
      loadtasktypes()
      
  }, [tasktypes])

    const loadtasktypes = async () => {
        try {
          const storedTaskTypes = await AsyncStorage.getItem('taskTypes');
          if (!storedTaskTypes) {
            const defaultTaskTypes = [
              {
                name: 'Today',
                random: 3,
                tasks: []
              },
              {
                name: 'Personal',
                random: 9,
                tasks: []
              },
            ];
            await AsyncStorage.setItem('taskTypes', JSON.stringify(defaultTaskTypes));
            setTaskTypes(defaultTaskTypes);
          } else {
            // Parse the string data from AsyncStorage into a JavaScript object
            setTaskTypes(JSON.parse(storedTaskTypes));
          }
        } catch (error) {
          console.error('Error while loading the task types', error);
        }
    }

    const addTaskType = async (newTaskType) => {
        try {
            const random = Math.floor(Math.random() * (10 - 2) + 1 )
            const taskType = { name: newTaskType, random, tasks: [] }
            const updatedTaskTypes = [ ...tasktypes, taskType ]
            setTaskTypes(updatedTaskTypes)

            await AsyncStorage.setItem('taskTypes', JSON.stringify(updatedTaskTypes))
        } catch (error) {
            console.error('error while adding new task type : ', error)
        }
    }

    const closeModal = () => {
      setIsActiveModal(false)
    }

    const removeTaskType = async (index) => {
      try {
        const updatedTasks = [...tasktypes]
        updatedTasks.splice(index, 1)
        setTaskTypes(updatedTasks)

        await AsyncStorage.setItem('taskTypes', JSON.stringify(updatedTasks))
      } catch (error) {
        console.log('error while removing a task type : ', error )
      }
    }

    
    const deleteTaskType = (item, index) => {
      Alert.alert(
        `Delete ${item.name} Tasks`, 
        'You sure want to delete this task type', 
        [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            onPress: () => removeTaskType(index)
          }
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              'This alert was dismissed by tapping outside of the alert dialog.',
            ),
        },
      )
    }


    const renderTaskTypeItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => navigation.navigate('TaskType', {item, index})} className='w-full h-[130px] px-2 bg-white border-2 border-b-[5px] rounded-lg shadow-sm shadow-black mb-4 flex-row justify-center items-between overflow-hidden'>
            <TouchableOpacity onPress={() => deleteTaskType(item, index)} className='absolute z-10 right-2 top-2'>
              <MaterialIcons name="delete" size={30} color="#EF4040" />
            </TouchableOpacity>
            <Image className='absolute w-full h-full opacity-20' source={require('../../assets/images/background.jpg')} />
            <Image className='h-full w-2/5' source={imagePaths[item.random]} />
            <View className='h-full w-3/5 justify-center pl-4'>
              <Text className='text-2xl text-purple-800' style={{fontFamily: 'Exo-bold'}} >{item.name}</Text>
              <Text className='text-lg text-gray-600' style={{fontFamily: 'Nunito-bold'}} >You have {item.tasks.length} Tasks</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className='flex-1 mt-5 h-full' >
            <TouchableOpacity onPress={() => setIsActiveModal(true)} className='w-1/2 justify-center items-center px-5 py-3 mb-6 border-2 border-b-4 rounded-lg bg-yellow-400'>
              <Text className='text-lg' style={{fontFamily: 'Nunito-semiBold'}} >New TaskType</Text>
            </TouchableOpacity>

            <FlatList
                data={tasktypes}
                renderItem={renderTaskTypeItem}
                keyExtractor={(item) => item.name}
                showsVerticalScrollIndicator={false}
            />

            <Modal
                visible={isActiveModal}
                animationType='slide'
                transparent={true}
            >
             <AddTaskTypeModal closeModal={closeModal} addTaskType={addTaskType} />
            </Modal>
        </View>
    )
}