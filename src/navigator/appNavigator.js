import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Welcome from '../screens/welcome';
import Home from '../screens/home';
import Authenticate from '../screens/authenticate';
import TaskType from '../screens/taskType';

const Stack = createStackNavigator()

export default function ppNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Authenticate' component={Authenticate} />
            <Stack.Screen name='TaskType' component={TaskType} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}