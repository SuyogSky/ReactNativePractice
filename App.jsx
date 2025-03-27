import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import GetRequest from './src/components/GetRequest'
import PostRequest from './src/components/PostRequest'
import PutRequest from './src/components/PutRequest'
import PatchRequest from './src/components/PatchRequest'
import Test from './src/components/Test'
import AsyncStoragePractice from './src/components/AsyncStoragePractice'
import Login from './src/components/UserAuthentication/Login'
import Register from './src/components/UserAuthentication/Register'
import RegisterScreen from './src/screens/Register'
import ForgotPassword from './src/components/UserAuthentication/ForgotPassword'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home'

const AuthStack = createStackNavigator();

const App = () => {
  return (
    // <ScrollView>
    //   <GetRequest />
    //   <PostRequest />
    //   {/* <PutRequest /> */}
    //   {/* <PatchRequest /> */}
    // </ScrollView>
    // <AsyncStoragePractice />
    // <Register />
    // <Login />
    // <ForgotPassword />

    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <AuthStack.Screen name='Register' component={Register}  options={{headerShown: false}}  />
        <AuthStack.Screen name='ForgotPassword' component={ForgotPassword}  options={{headerShown: false}} />
        <AuthStack.Screen name='Home' component={Home} />
      </AuthStack.Navigator>
    </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCircle: {
    position: 'absolute',
    top: -150,
    left: -60,
    width: 250,
    height: 250,
    borderRadius: '50%',
    backgroundColor: '#8c2de2',
  },
  largeCircle: {
    position: 'absolute',
    top: -150,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: '50%',
    backgroundColor: '#6c2de2',
  }
})
export default App