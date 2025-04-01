import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';


const ImageUploadScreen = () => {
    
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      const result = await launchImageLibrary({ mediaType: 'photo' });
  
      if (!result.didCancel) {
        const uri = result.assets[0].uri;
        setImage(uri);
        uploadImage(uri);
      }
    };
  
    const uploadImage = async (imageUri) => {
      const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const reference = storage().ref(`uploads/${fileName}`);
  
      try {
        await reference.putFile(imageUri);
        const downloadURL = await reference.getDownloadURL();
        console.log('Image uploaded! URL:', downloadURL);
        Alert.alert('Upload Successful', `Image URL: ${downloadURL}`);
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Upload Failed', error.message);
      }
    };
  
    return (
      <View>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button title="Pick Image" onPress={pickImage} />
      </View>
    );
  };
  
  export default ImageUploadScreen;
  