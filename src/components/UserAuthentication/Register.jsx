import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { registerUser } from '../../auth'

const Register = ({navigation}) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        try {
            const userDetails = await registerUser(email, password)
            Alert.alert('Success', 'Email Verification Link Sent.')
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }
    
    return (
        <View style={{padding: 20}}>
            <Text style={{textAlign: 'center', fontSize: 32, color: 'purple', marginBottom: 40}}>Register</Text>
            <TextInput
                placeholder='Enter Username'
                value={userName}
                onChangeText={setUserName}
                style={{borderWidth: 1, borderBlockColor: 'gray', paddingHorizontal: 15, paddingVertical: 7, marginBottom: 20}}
                
            />
            <TextInput
                placeholder='Enter Your Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                style={{borderWidth: 1, borderBlockColor: 'gray', paddingHorizontal: 15, paddingVertical: 7, marginBottom: 20}}
            />
            <TextInput
                placeholder='Enter Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{borderWidth: 1, borderBlockColor: 'gray', paddingHorizontal: 15, paddingVertical: 7, marginBottom: 20}}
            />

            <TouchableOpacity style={{paddingHorizontal: 15, paddingVertical: 10, backgroundColor: 'purple', borderRadius: 5, marginBottom: 20}} onPress={handleSubmit}>
                <Text style={{textAlign: 'center', color: 'white'}}>Register</Text>
            </TouchableOpacity>

                        <Text style={{textAlign: 'center'}}>Already have an account? <Text style={{marginBottom: 20, color: 'purple', fontSize: 16}} onPress={() => {navigation.navigate('Login')}}>Login</Text></Text>
            
        </View>
    )
}

export default Register