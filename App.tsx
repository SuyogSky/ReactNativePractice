import React from 'react'
import CustomModal from './src/components/CustomModal'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/components/Home'
import About from './src/components/About'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import { AuthProvider } from './src/context/AuthContext'

const TopTab = createMaterialTopTabNavigator();

const StackInstance = createNativeStackNavigator()

const BottomTab = createBottomTabNavigator()


const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackInstance.Navigator>
          <StackInstance.Screen name='Login' component={Login} />
          <StackInstance.Screen name='Register' component={Register} />
          <StackInstance.Screen name='Home' component={Home} />
          {/* <StackInstance.Screen name='Modal' component={CustomModal} /> */}
        </StackInstance.Navigator>
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App