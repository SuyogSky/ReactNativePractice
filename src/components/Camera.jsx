import { View, Text, Image, Button, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import WebView from 'react-native-webview';

const Camera = () => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' })
        if (!result.didCancel) {
            const uri = result.assets[0].uri
            setImage(uri)
        }
    }

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            )
            return permission === PermissionsAndroid.RESULTS.GRANTED
        }
        return true
    }

    const openCamera = async () => {
        const permission = await requestCameraPermission()
        if (!permission) {
            console.log('Permission Canceled.')
            return
        }
        launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
            if (!response.didCancel && response.assets) {
                setImage(response.assets[0].uri)
            }
            else {
                console.log('Camera Launch Canceled.')
            }
        })
    }

    const [location, setLocation] = useState(null)
    const getLocation = async () => {
        Geolocation.getCurrentPosition(
            (loc) => setLocation(loc.coords),
            (err) => console.log(err),
        )
    }

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location Permission Declined.')
                return
            }
        }
        getLocation()
    }

    // useEffect(() => {
    //     requestLocationPermission()
    // }, [])

    const mapCode = `
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
    `
    return (
        <View>
            <Text>Camera</Text>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title='Pick Image' onPress={pickImage} />
            <Button title='Launch Camera' onPress={openCamera} />

            {location && <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>}
            <Button title='Get Location' onPress={requestLocationPermission} />

            {
                location && 
                <View style={{ width: '100%', height: 200, margin: 10 }}>
                    <WebView source={{ html: mapCode }} />
                </View>
            }
            <Button title='Refresh' onPress={getLocation} />
        </View>
    )
}

export default Camera