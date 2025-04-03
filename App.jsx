import React, { useContext, useEffect, useState } from 'react'
import Login from './src/components/UserAuthentication/Login'
import Register from './src/components/UserAuthentication/Register'
import ForgotPassword from './src/components/UserAuthentication/ForgotPassword'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home'
import { getAuth } from '@react-native-firebase/auth'
import DetailsPage from './src/components/DetailsPage'
import { AuthProvider } from './src/context/AuthContext'
import UserCrud from './src/components/UserCrud/UserCrud'
import Test from './src/components/Test'
import ImageUpload from './src/components/UserCrud/ImageUpload'
import ImagePickerExample from './src/components/Test'
import Camera from './src/components/Camera'

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const PrivateStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Details' component={DetailsPage} />
    </Stack.Navigator>
  )
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState()
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      setIsLoggedIn(user)
    })
  }, [])

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

    // <AuthProvider>
    //   <NavigationContainer>
    //     {isLoggedIn ? <PrivateStack /> : <AuthStack />}
    //   </NavigationContainer>
    // </AuthProvider>
    // <UserCrud />
    // <ImageUpload />
    <Camera />
  )
}

export default App