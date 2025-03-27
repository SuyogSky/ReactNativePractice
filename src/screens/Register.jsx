import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { isValidElement, useState } from 'react'
import form from '../styles/form'
import axios from 'axios'

const RegisterScreen = ({navigation}) => {
  const [formData, setFormData] = useState({id: '', name: '', email: ''})

  const handleInput = (field, value) => {
    setFormData({...formData, [field]: value})
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/users', 
        {
          id: 100,
          name: 'suyogosogoagogs',
          email: 'asjdhasjdhkajshd'
        }
      )
      Alert.alert('Success', 'Data Submitted')
      setFormData({id: '', name: '', email: ''})
      console.log(response.data)
    } catch (error) {
      Alert.alert('Error', 'failed')
    }
  }
  return (
    <View style={form.formContainer}>
      <Text style={form.headingText}>Register</Text>

      <TextInput 
        placeholder='Full Name'
        style={form.inputField}    
        onChangeText={(value) => handleInput('name', value)}
      />

      <TextInput 
        placeholder='Email'
        keyboardType='email-address'
        style={form.inputField}    
        onChangeText={(value) => handleInput('email', value)}
        />
      <TextInput 
        placeholder='Password'
        secureTextEntry
        style={form.inputField}
        onChangeText={(value) => handleInput('id', value)}
      />

      <TouchableOpacity style={form.btnStyle} onPress={handleSubmit}>
        <Text style={form.btnText}>Register</Text>
      </TouchableOpacity>

      <Text style={{textAlign: 'center', fontSize: 16, margin: 20}}>Already have an Account? <Text style={{color: 'purple', fontWeight: 'bold'}} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
    </View>
  )
}

export default RegisterScreen