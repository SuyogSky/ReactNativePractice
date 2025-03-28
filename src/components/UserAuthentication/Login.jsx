import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'

const Login = ({navigation}) => {
    const {loginUser} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        try {
            const { user, isEmailVerified } = await loginUser(email, password)
            if (isEmailVerified) {
                Alert.alert('Success', 'Login Successful')
                navigation.replace('Home')
            }
            else {
                Alert.alert('Warning', 'Email is not verified.')
            }
        }
        catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    return (
        <View style={{ padding: 20}}>
            <Text style={{ textAlign: 'center', fontSize: 32, color: 'purple', fontWeight: 'bold', marginBottom: 40 }}>Login</Text>
            <TextInput
                placeholder='Enter Your Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                style={{ borderWidth: 1, borderBlockColor: 'gray', paddingHorizontal: 15, paddingVertical: 7, marginBottom: 20 }}
            />
            <TextInput
                placeholder='Enter Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, borderBlockColor: 'gray', paddingHorizontal: 15, paddingVertical: 7, marginBottom: 10 }}
            />
            <Text style={{marginBottom: 20, color: 'purple', fontSize: 16}} onPress={() => {navigation.navigate('ForgotPassword')}}>Forgot Password?</Text>

            <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5,  backgroundColor: 'purple', marginBottom: 20 }} onPress={handleSubmit}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Login</Text>
            </TouchableOpacity>

            <Text style={{textAlign: 'center'}}>Do not have an account? <Text style={{marginBottom: 20, color: 'purple', fontSize: 16}} onPress={() => {navigation.navigate('Register')}}>Register</Text></Text>

        </View>
    )
}

export default Login