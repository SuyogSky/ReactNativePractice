import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import form from '../styles/form'
import AuthContext from '../context/AuthContext'

const Login = ({navigation}) => {
    const {loginUser} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = () => {
        const successLogin = loginUser(email, password)
        if (successLogin) {
            navigation.navigate('Home')
        }

    }
  return (
    <View style={form.formContainer}>
      <Text style={form.headingText}>Login</Text>

      <TextInput 
        placeholder='Email'
        keyboardType='email-address'
        style={form.inputField}
        onChangeText={setEmail}
      />
      <TextInput 
        placeholder='Password'
        secureTextEntry
        style={form.inputField}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={form.btnStyle} onPress={onSubmit}>
        <Text style={form.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login