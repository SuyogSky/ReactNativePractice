import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import form from '../styles/form'

const Register = ({navigation}) => {
  return (
    <View style={form.formContainer}>
      <Text style={form.headingText}>Register</Text>

      <TextInput 
        placeholder='Full Name'
        style={form.inputField}    
      />

      <TextInput 
        placeholder='Email'
        keyboardType='email-address'
        style={form.inputField}    
      />
      <TextInput 
        placeholder='Password'
        secureTextEntry
        style={form.inputField}
      />

      <TouchableOpacity style={form.btnStyle}>
        <Text style={form.btnText}>Register</Text>
      </TouchableOpacity>

      <Text style={{textAlign: 'center', fontSize: 16, margin: 20}}>Already have an Account? <Text style={{color: 'purple', fontWeight: 'bold'}} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
    </View>
  )
}

export default Register