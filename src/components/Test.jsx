import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';

import { launchImageLibrary } from 'react-native-image-picker';




const ImageUploadScreen = () => {
    const [image, setImage] = useState(null);

    const [caption, setCaption] = useState('');
    
    const [imageUri, setImageUri] = useState(null);
    const pickImage = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });

        if (!result.didCancel) {
            setImageUri(result.assets[0].uri);
        }
    };


    const uploadImage = async (imageUri) => {
        if (!imageUri) return null;

        const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const reference = storage().ref(`posts/${fileName}`);

        try {
            await reference.putFile(imageUri);
            return await reference.getDownloadURL(); // Get image URL
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const savePost = async (imageUri, caption) => {
        try {
            const imageUrl = await uploadImage(imageUri);
            if (!imageUrl) return Alert.alert('Upload Failed', 'Could not upload image');

            await firestore().collection('posts').add({
                userId: '1',
                username: 'suyog',
                imageUrl: imageUrl,
                caption: caption,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

            Alert.alert('Success', 'Post uploaded successfully!');
        } catch (error) {
            console.error('Error saving post:', error);
            Alert.alert('Error', 'Could not save post');
        }
    };




    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create a Post</Text>

            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}

            <Button title="Pick Image" onPress={() => pickImage()} />

            <TextInput
                placeholder="Enter caption..."
                value={caption}
                onChangeText={setCaption}
                style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
            />

            <Button title="Post" onPress={() => savePost(imageUri, caption)} />
        </View>
    );
};

const Test = () => {
    return (
        <View>
            <Text>Test</Text>
            <ImageUploadScreen />
        </View>
    )
}

export default Test