import { View, Text, TextInput, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PutRequest = () => {
    const [id, setId] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://10.0.2.2:3000/users/${id}`,
                {
                    name: fullName,
                    email: email,
                }
            )
            Alert.alert('Success', 'User updated successfully.')
            console.log(response)
            setId('')
            setFullName('')
            setEmail('')
        } catch (error) {
            Alert.alert('Error', 'Error adding user.')
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 32, textAlign: 'center', marginBottom: 30 }}>API Put Request <Ionicons name="person" size={30} color="#900" /></Text>
            <View>
                <TextInput
                    placeholder='Enter ID'
                    style={{ borderColor: 'gray', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 20, borderRadius: 5 }}
                    onChangeText={setId}
                    value={id}
                />
                <TextInput
                    placeholder='Enter Full Name'
                    style={{ borderColor: 'gray', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 20, borderRadius: 5 }}
                    onChangeText={setFullName}
                    value={fullName}
                />
                <TextInput
                    placeholder='Enter Email'
                    style={{ borderColor: 'gray', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 20, borderRadius: 5 }}
                    onChangeText={setEmail}
                    value={email}
                />
                <TouchableOpacity style={{ backgroundColor: 'orange', paddingVertical: 15, borderRadius: 5 }} onPress={handleUpdate}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PutRequest