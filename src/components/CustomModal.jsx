import { View, Text, Modal, TouchableOpacity, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const CustomModal = () => {

    const [showModal, setShowModal] = useState(false)

    const cancelFunction = () => {
        console.log('Cancel Clicked')
        setShowModal(false)
    }
    
    const confirmFunction = () => {
        console.log('Confirm Clicked')
        setShowModal(false)
    }

    return (
        <View>
            <Text>CustomModal</Text>

            <Modal
                visible={showModal}
                transparent={true}
                animationType='fade'
            >
                <View style={customModal.mainContainer}>
                    <View style={customModal.popUpContainer}>
                        <Text style={customModal.heading}>Heading</Text>
                        <Text style={customModal.text}>Message</Text>
                        <View style={customModal.btnContainer}>
                            <TouchableOpacity onPress={cancelFunction} style={customModal.cancelBtn}>
                                <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>Cancle</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={confirmFunction} style={customModal.confirmBtn}>
                                <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Button title='Show Modal' onPress={() => setShowModal(true)} />
        </View>
    )
}

const customModal = StyleSheet.create(
    {
        mainContainer: {
            flex: 1,
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
        popUpContainer: {
            backgroundColor: 'white',
            width: '80%',
            paddingVertical: 30,
            paddingHorizontal: 40,
            borderRadius: 10,
        },
        heading: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'purple'
        },
        text: {
            fontSize: 18,
        },
        btnContainer: {
            // flex: 1,
            flexDirection: 'row'
        },
        cancelBtn: {
            backgroundColor: 'red',
            borderRadius: 50,
            width: 80,
            height: 40,
        }, 
        confirmBtn: {
            backgroundColor: 'lightgreen',
            borderRadius: 50,
            width: 80,
            height: 40,
        }
    }
)

export default CustomModal