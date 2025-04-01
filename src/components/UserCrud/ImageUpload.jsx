import { View, Text, Button, Image, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import storage from '@react-native-firebase/storage'
import { launchImageLibrary } from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore'

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('')
    const user = { name: 'suyog', email: 'suyog@gmail.com' }

    const pickImage = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' })

        if (!result.didCancel) {
            const uri = result.assets[0].uri
            setImage(uri)
        }
    }

    // const uploadImage = async (imageUri) => {
    //     const fileName = imageUri.subString(imageUri.lastIndexOF('/') + 1)
    //     const reference = storage().ref(`uploads/${fileName}`)

    //     try {
    //         await reference.putFile(imageUri)
    //         const downloadURL = await reference.getDownloadURL()
    //         Alert.alert('Success', 'Image Uploaded Successfully.')
    //     } catch (error) {
    //         Alert.alert('Error', error.message)
    //     }
    // }

    const uploadPost = async () => {
        try {
            const fileName = image.substring(image.lastIndexOf('/') + 1)
            // const reference = storage().ref(`uploads/${fileName}`)
            // await reference.putFile(imageUri)
            // const downloadURL = await reference.getDownloadURL()

            await firestore().collection('posts').add({
                title,
                image: fileName,
                user,
                createdAt: firestore.FieldValue.serverTimestamp(),
            })
            Alert.alert('Success', 'Post Uploaded Successfully.')

        } catch (error) {
            Alert.alert('Error', error.message)

        }
    }

    return (
        <View>
            <Text>ImageUpload</Text>
            <TextInput
                placeholder='Enter Title'
                value={title}
                onChangeText={setTitle}
            />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title='Pick Image' onPress={pickImage} />

            <Button title='Upload Post' onPress={uploadPost} />
        </View>
    )
}

export default ImageUpload