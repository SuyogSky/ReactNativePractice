import { View, Text, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { registerUser } from '../services/auth'

const Test = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
      try {
        await registerUser(email, password)
        Alert.alert('Success', 'Email verification is sent.')
      } catch (error) {
          Alert.alert('Error', error.message)
      }
    }
    
    return (
        <View>
            <Text>Test</Text>
            <TextInput
                placeholder='Enter Username'
                value={userName}
                onChangeText={setUserName}
            />
            <TextInput
                placeholder='Enter Your Email'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder='Enter Password'
                value={password}
                onChangeText={setPassword}
            />

            <Button title='Register' onPress={handleSubmit}/>
        </View>
    )
}

export default Test