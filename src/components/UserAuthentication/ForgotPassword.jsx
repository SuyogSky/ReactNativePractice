import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'

const ForgotPassword = ({navigation}) => {
    const {resetPassword} = useContext(AuthContext)

    const [email, setEmail] = useState('')

    const handleSubmit = async () => {
        if (email == ''){
            Alert.alert('Warning', 'Please enter your email.')
            return;
        }
        try {
            await resetPassword(email)
            Alert.alert('Success', 'Password reset link sent to your email.')
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <View style={{ backgroundColor: 'white', width: '90%', padding: 20, borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 32, color: 'purple', fontWeight: 'bold', marginBottom: 30 }}>ForgotPassword</Text>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    style={{ borderWidth: 1, borderBlockColor: 'gray', paddingHorizontal: 15, paddingVertical: 10, marginBottom: 20, borderRadius: 5 }}
                />

                <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10, borderRadius: 5, backgroundColor: 'purple', marginBottom: 20 }} onPress={handleSubmit}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Send Reset Link</Text>
                </TouchableOpacity>

                <Text style={{color: 'purple', textAlign: 'center', fontSize: 16}} onPress={() => navigation.navigate('Login')}>Go back to Login.</Text>
            </View>
        </View>
    )
}

export default ForgotPassword