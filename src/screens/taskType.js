import { View, Text, TouchableOpacity, FlatList, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AddTaskModal from '../components/addTaskModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TaskType({ route }) {
    const {item, index} = route.params
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [isActiveMenu, setIsActiveMenu] = useState(false)
    const [taskTypes, setTaskTypes] = useState([])
    const navigation = useNavigation()

    const [taskType, setTaskType] = useState(item)

    useEffect(() => {
      loadtasktypes()
      
    }, [])

    const removeTaskType = async () => {
      try {
        const updatedTasks = [...taskTypes]
        updatedTasks.splice(index, 1)
        setTaskTypes(updatedTasks)

        await AsyncStorage.setItem('taskTypes', JSON.stringify(updatedTasks))
        navigation.navigate('Home')
      } catch (error) {
        console.log('error while removing a task type : ', error )
      }
    }

    
    const closeModal = () => {
      setIsActiveModal(false)
    }
    
    const loadtasktypes = async () => {
    try {
      const storedTaskTypes = await AsyncStorage.getItem('taskTypes');
      // Parse the string data from AsyncStorage into a JavaScript object
      if(storedTaskTypes){
        setTaskTypes(JSON.parse(storedTaskTypes));
        
        // test me
        const task = JSON.parse(storedTaskTypes)
        if(task.length > 0){
          setTaskType(task[index])
          console.log(taskType)
        }
      }
    } catch (error) {
      console.error('Error while loading the task types', error);
    }
  }

  const addNewTask = async (newTask) => {
    try {
      const updatedTaskTypes = [...taskTypes]
      updatedTaskTypes[index].tasks.push(newTask)
      setTaskTypes([...updatedTaskTypes]);

      const tasks = updatedTaskTypes
      
      if(tasks.length > 0){
        setTaskType(tasks[index])
        console.log(taskType)
      }
      
      await AsyncStorage.setItem('taskTypes', JSON.stringify(updatedTaskTypes))
    } catch (error) {
      console.error('error while adding new task', error)
    }
  }

  const addTaskMenu = () => {
    setIsActiveModal(true) 
    setIsActiveMenu(false)
  } 
  
  const removeTask = async (taskIndex) => {
    try {
      const updatedTasks = [ ...taskTypes ]
      updatedTasks[index].tasks.splice(taskIndex, 1)
      setTaskTypes([...updatedTasks]);
      
      const tasks = updatedTasks
      
      if(tasks.length > 0){
        setTaskType(tasks[index])
        console.log(taskType)
      }

      await AsyncStorage.setItem('taskTypes', JSON.stringify(updatedTasks))
      console.log('task removed : ', taskIndex)
    } catch (error) {
      console.error('error while removing a task : ', error)
    }
  }
  
  const deleteTaskType = () => {
    setIsActiveMenu(false)
    Alert.alert(
      `Delete ${item.name} Tasks`, 
      'You sure want to delete this task type', 
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: removeTaskType
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

  const Task = ({item, index: taskIndex}) => (
    <View className='w-[95%] self-center flex-row items-center justify-between py-3 px-3 border-2 border-b-4 rounded-lg bg-white mb-3'>
      <Text className='text-lg ml-2' style={{fontFamily: 'Nunito-semiBold'}} >{item}</Text>
      <TouchableOpacity onPress={() => removeTask(taskIndex)}>
        <FontAwesome name="remove" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className='flex-1 p-5 bg-yellow-50 items-center border'>

      <View className='flex-row mt-5 w-[98%] justify-between items-center'>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <AntDesign name="leftcircleo" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsActiveMenu(true)} >
            <AntDesign name="ellipsis1" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isActiveMenu}
        animationType='fade'
        transparent={true}
      >
        <View className='flex-1 mt-5 py-2 px-4 w-[98%]'>
          <View className='w-1/2 h-[200px] bg-white border-2 border-b-[8px] shadow-sm shadow-black rounded-lg items-center justify-around self-end'>
            <TouchableOpacity onPress={addTaskMenu} className='w-[70%] py-2 flex-row justify-between items-center text-lg text-black border-b border-gray-400' >
              <Text className='text-lg' style={{fontFamily: 'Nunito-semiBold'}} >Add Task</Text>
              <Ionicons name="add" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteTaskType} className='w-[70%] py-2 flex-row justify-between items-center text-lg text-black border-b border-gray-400' >
              <Text className='text-lg text-red-600' style={{fontFamily: 'Nunito-semiBold'}} >Delete</Text>
              <MaterialIcons name="delete" size={30} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsActiveMenu(false)} className='w-[70%] py-2 flex-row justify-center items-center text-lg text-black' >
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text className='text-4xl mt-4' style={{fontFamily: 'Exo-bold'}} >{taskType.name}</Text>
      <Text className='text-xl text-gray-700 mb-8' style={{fontFamily: 'Nunito-bold'}} >{taskType.tasks.length} tasks</Text>
      
      <TouchableOpacity onPress={() => setIsActiveModal(true)} className='absolute z-10 bottom-5 flex-row justify-center items-center px-6 py-3 text-lg border border-b-4 rounded-md text-black bg-orange-400' >
        <Text className='text-lg text-white mr-2' style={{fontFamily: 'Nunito-semiBold'}} >Add Task</Text>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <FlatList 
        data={taskType.tasks}
        renderItem={({ item, index }) => <Task item={item} index={index} />}
        showsVerticalScrollIndicator={false}
        className='w-full'
      />

      <Modal
          visible={isActiveModal}
          animationType='slide'
          transparent={true}
      >
        <AddTaskModal item={item} addNewTask={addNewTask} closeModal={closeModal}/>
      </Modal>

    </View>
  )
}

const tasks = ['Develop your comunication skills', 'Go shower', 'Start learning new languages']