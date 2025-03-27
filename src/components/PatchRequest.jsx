import { View, Text, TextInput, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'

const PatchRequest = ({userId, setShowModal}) => {
    const [formData, setFormData] = useState({id: '', name: '', email: ''})

    const handleInput = (key, value) => {
        setFormData({...formData, [key]: value})
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.patch(`http://10.0.2.2:3000/users/${userId}`,{
                ...formData.name && {name: formData.name},
                ...formData.email && {email: formData.email},
            })
            Alert.alert('Success', 'User Updated successfully.')
            console.log(response)
            setFormData({id: '', name: '', email: ''})
        } catch (error) {
            Alert.alert('Error', 'Error adding user.')
            console.log(error)
        }
    }
    return (
        <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{width: '90%', backgroundColor: 'white', padding: 20}}>
            <Text style={{ fontSize: 32, textAlign: 'center', marginBottom: 30 }}>API Patch Request</Text>
            <View>
                <TextInput
                    placeholder='Enter ID'
                    style={{ borderColor: 'gray', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 15, marginBottom: 20, borderRadius: 5 }}
                    onChangeText={(value) => handleInput('id', value)}
                    value={userId}
                    editable={false}
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
                <TouchableOpacity style={{ backgroundColor: 'orange', paddingVertical: 10, borderRadius: 5, marginBottom: 30 }} onPress={handleSubmit}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: 'red', paddingVertical: 10, borderRadius: 5 }} onPress={() => setShowModal(false)}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Cancel</Text>
                </TouchableOpacity>
                
            </View>
            </View>
        </View>
    )
}

export default PatchRequest