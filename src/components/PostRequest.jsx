import { View, Text, TextInput, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'

const PostRequest = () => {
    const [formData, setFormData] = useState({id: '', name: '', email: ''})

    const handleInput = (key, value) => {
        setFormData({...formData, [key]: value})
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:3000/users',formData)
            Alert.alert('Success', 'User added successfully.')
            console.log(response)
            setFormData({id: '', name: '', email: ''})
        } catch (error) {
            Alert.alert('Error', 'Error adding user.')
        }
    }
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 32, textAlign: 'center', marginBottom: 30 }}>API Post Request</Text>
            <View>
                <TextInput
                    placeholder='Enter ID'
                    style={{ borderColor: 'gray', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 20, borderRadius: 5 }}
                    onChangeText={(value) => handleInput('id', value)}
                    value={formData.id}
                />
                <TextInput
                    placeholder='Enter Full Name'
                    style={{ borderColor: 'gray', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 20, borderRadius: 5 }}
                    onChangeText={(value) => handleInput('name', value)}
                    value={formData.name}
                />
                <TextInput
                    placeholder='Enter Email'
                    style={{ borderColor: 'gray', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 20, borderRadius: 5 }}
                    onChangeText={(value) => handleInput('email', value)}
                    value={formData.email}
                />
                <TouchableOpacity style={{ backgroundColor: 'orange', paddingVertical: 15, borderRadius: 5 }} onPress={handleSubmit}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostRequest