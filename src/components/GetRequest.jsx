import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import PatchRequest from './PatchRequest';

const GetRequest = () => {

    const [users, setUsers] = useState([])
    const getUsers = () => {
        axios.get('http://10.0.2.2:3000/users').then((response) => {
            console.log(response.data)
            setUsers(response.data)
        })
    }

    useEffect(() => {
        // fetch('http://10.0.2.2:3000/users').then((response) => {
        //   response.json().then((data) => {
        //     console.log(data)
        //   })
        // })
        getUsers()
    }, [])

    const deleteUser = (id) => {
        try {
            const response = axios.delete(`http://10.0.2.2:3000/users/${id}`)
            console.log('response', response)
            Alert.alert('Success', 'User Deleted successfully.')
            getUsers()
        } catch (error) {
            console.log(error)
            Alert.alert('Error', 'Error deleting user.')
        }
    }
    const [showModal, setShowModal] = useState(false)
    const [editUserId, setEditUserId] = useState('')

    const handleEdit = (id) => {
        console.log(id)
        setShowModal(!showModal)
        setEditUserId(id)
    }
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.heading}>Api Get Request</Text>

            <View style={styles.usersContainer}>

                {users.map((user) => {
                    return (
                        <View key={user.id} style={styles.user}>
                            <View>
                                <Text style={styles.userName}>{user.name}</Text>
                                <Text style={styles.userEmail}>{user.email}</Text>
                            </View>

                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={{marginRight: 15}} onPress={() => handleEdit(user.id)}>
                                    <Feather name="edit" color="blue" size={24} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteUser(user.id)}>
                                    <Entypo name="trash" color="red" size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>

            <Modal
                visible = {showModal}
                transparent={true}
                style={{flex: 1}}
            >
                <PatchRequest userId={editUserId} setShowModal={setShowModal} />
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'rgba(0,0,0,0.07)',
        padding: 20
    },
    heading: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30
    },
    usersContainer: {

    },
    user: {
        backgroundColor: 'white',
        marginBottom: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 40
    },
    userName: {
        fontSize: 24,
        fontWeight: 'semibold',
    },
    userEmail: {
        fontSize: 16
    }
})

export default GetRequest