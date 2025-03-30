import { View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addUserData, deleteUser, getUsers, updateUser } from '../../firestore/firestoreCRUD'

const UserCrud = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [editId, setEditId] = useState(null)

    const [users, setUsers] = useState([])
    const fetchUser = async () => {
        try {
            const userList = await getUsers()
            setUsers(userList)
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    const handleSubmit = async () => {
        if (!name || !email || !phone){
            Alert.alert('Warning', 'Please Fill all the fields.')
            return
        }
        const userData = { name, email, phone }
        try {
            if (editId) {
                await updateUser(editId, userData)
                Alert.alert('Success', 'User Updated Successfully.')
            }
            else {
                await addUserData(userData)
                Alert.alert('Success', 'User Added Successfully.')
            }
            fetchUser()
            setEditId(null)
            setName('')
            setEmail('')
            setPhone('')
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteUser(id)
            Alert.alert('Success', 'User Deleted Successfully.')
            fetchUser()
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    const handleEditClick = (user) => {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        setEditId(user.id)
    }


    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 32, textAlign: 'center', marginBottom: 20 }}>User Crud</Text>
            <View>
                <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>{editId ? 'Update User' : 'Add User'}</Text>
                <View style={{ marginBottom: 40 }}>
                    <TextInput
                        placeholder='Name'
                        value={name}
                        onChangeText={setName}
                        style={{ borderRadius: 5, borderWidth: 1, borderColor: 'gray', marginBottom: 15 }}
                    />
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        style={{ borderRadius: 5, borderWidth: 1, borderColor: 'gray', marginBottom: 15 }}
                    />
                    <TextInput
                        placeholder='Phone'
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType='phone-pad'
                        style={{ borderRadius: 5, borderWidth: 1, borderColor: 'gray', marginBottom: 15 }}
                    />

                    <Button title={editId ? 'Update User' : 'Add User'} onPress={handleSubmit} />
                </View>

                <FlatList
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.1)', marginBottom: 10, padding: 15 }}>
                                <View>
                                    <Text>{item.name}</Text>
                                    <Text>{item.email}</Text>
                                    <Text>{item.phone}</Text>
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20}}>
                                    <TouchableOpacity style={{ backgroundColor: 'blue', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 5 }} onPress={() => handleEditClick(item)}>
                                        <Text style={{color: 'white'}}>Edit</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ backgroundColor: 'red', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 5 }} onPress={() => handleDelete(item.id)}>
                                        <Text style={{color: 'white'}}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: 24, marginVertical: 40 }}>No User Found.</Text>}
                />
            </View>
        </ScrollView>
    )
}

export default UserCrud