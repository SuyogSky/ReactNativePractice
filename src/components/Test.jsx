import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image, PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import { WebView } from 'react-native-webview';

const ImagePickerExample = () => {
    const [imageUri, setImageUri] = useState(null);
    const [location, setLocation] = useState(null);

    // Open Camera
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // iOS automatically grants permission
    };

    const openCamera = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            console.log('Camera permission denied');
            return;
        }

        launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
            if (!response.didCancel && response.assets) {
                setImageUri(response.assets[0].uri);
            } else {
                console.log('Camera launch canceled');
            }
        });
    };

    // Open Gallery
    const openGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && response.assets) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    // Request Location Permission
    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission denied');
                return;
            }
        }
        getLocation();
    };

    // Get Current Location
    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => setLocation(position.coords),
            (error) => console.log('Error:', error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    // Leaflet Map HTML
    const mapHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
            <style>
                #map { height: 100vh; width: 100vw; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                var map = L.map('map').setView([${location?.latitude || 27.7172}, ${location?.longitude || 85.3240}], 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);
                L.marker([${location?.latitude || 27.7172}, ${location?.longitude || 85.3240}]).addTo(map)
                  .bindPopup('You are here!')
                  .openPopup();
            </script>
        </body>
        </html>
    `;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginBottom: 10 }} />}

            <Button title="Open Camera" onPress={openCamera} />
            <Button title="Open Gallery" onPress={openGallery} />
            <Button title="Get Location" onPress={requestLocationPermission} />

            {location && <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>}

            {/* Display Leaflet Map using WebView */}
            <View style={{ width: '100%', height: 300, marginTop: 10 }}>
                <WebView originWhitelist={['*']} source={{ html: mapHTML }} />
            </View>

            <Button title="Refresh Location" onPress={getLocation} />
        </View>
    );
};

export default ImagePickerExample;
