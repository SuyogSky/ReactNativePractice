import { View, Text, Button, Alert, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

const AsyncStoragePractice = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const [storedName, setStoredName] = useState('')
  const [storedAge, setStoredAge] = useState('')

  const saveUser = async () => {
    await AsyncStorage.setItem('userName', name)
    await AsyncStorage.setItem('age', age)
    Alert.alert('Success', 'User name and age saved successfully')
    setName('')
    setAge('')
    getUser()
  }

  const getUser = async () => {
    const savedName = await AsyncStorage.getItem('userName')
    const savedAge = await AsyncStorage.getItem('age')
    if (!savedName && !savedAge) {
      Alert.alert('Warning', 'No user details found.')
    }
    else {
      setStoredName(savedName)
      setStoredAge(savedAge)
    }
  }

  const removeUserName = async () => {
    await AsyncStorage.removeItem('userName')
    Alert.alert('Success', 'Username removed successfully.')
    getUser()
  }

  const removeAge = async () => {
    await AsyncStorage.removeItem('age')
    Alert.alert('Success', 'Age removed successfully.')
    getUser()
  }
  
  const clearUser = async () => {
    await AsyncStorage.clear()
    Alert.alert('Success', 'User Details Cleared')
    getUser()
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 32, textAlign: 'center', paddingBottom: 30 }}>Async Storage Practice</Text>
      <TextInput
        placeholder='Enter Your Name'
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderColor: 'black', marginBottom: 20 }}
      />
      <TextInput
        placeholder='Enter Your Age'
        value={age}
        onChangeText={setAge}
        style={{ borderWidth: 1, borderColor: 'black', marginBottom: 20 }}
      />

      {
        (storedName || storedAge) && (
          <View style={{padding: 20, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 10, marginBottom: 20}}>
            {storedName && <Text style={{fontSize: 18, marginBottom: 15}}>User Name: {storedName}</Text>}
            {storedAge && <Text style={{fontSize: 18}}>Age: {storedAge}</Text>}
          </View>
        )
      }

      <Button title='Save User' onPress={saveUser} />
      <Button title='Get User' onPress={getUser} />
      <Button title='Remove Username' onPress={removeUserName} />
      <Button title='Remove Age' onPress={removeAge} />
      <Button title='Clear User' onPress={clearUser} />
    </View>
  )
}

export default AsyncStoragePractice