import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';

export default function DeveloperScreen() {
        const [settings, setSettings] = useState(null);
        const [locationData, setLocationData] = useState(null);

        const isoTime = new Date(locationData.timestamp).toISOString();



        useEffect(() => {
                loadSettings();
                fetchLocationData();
        }, []);

        const loadSettings = async () => {
                try {
                        const value = await SecureStore.getItemAsync('settings');
                        if (value !== null) {
                                const parsedSettings = JSON.parse(value);
                                setSettings(parsedSettings);
                        }
                } catch (error) {
                        console.log('Error loading settings:', error);
                }
        };

        const fetchLocationData = async () => {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                        console.log('Permission to access location was denied');
                        return;
                }

                const deviceLocation = await Location.getCurrentPositionAsync({});
                setLocationData(deviceLocation);
        };

        return (
                <View>
                        {settings && (
                                <View>
                                        <Text>Speed Unit (kph/mph): {settings.isSpeedUnitKMH ? 'kph' : 'mph'}</Text>
                                        <Text>Theme: {settings.theme}</Text>
                                        <Text>Keep Map North: {settings.keepMapNorth ? 'Yes' : 'No'}</Text>
                                        <Text>Show Speedometer: {settings.showSpeedometer ? 'Yes' : 'No'}</Text>
                                        <Text>Map View: {settings.mapView}</Text>
                                        <Text>GPS Speed: {locationData ? locationData.coords.speed : 'N/A'}</Text>
                                        <Text>GPS Accuracy: {locationData ? locationData.coords.accuracy : 'N/A'}</Text>
                                        <Text>GPS Altitude: {locationData ? locationData.coords.altitude : 'N/A'}</Text>
                                        <Text>GPS Altitude Accuracy: {locationData ? locationData.coords.altitudeAccuracy : 'N/A'}</Text>
                                        <Text>GPS Heading: {locationData ? locationData.coords.heading : 'N/A'}</Text>
                                        <Text>GPS Latitude: {locationData ? locationData.coords.latitude : 'N/A'}</Text>
                                        <Text>GPS Longitude: {locationData ? locationData.coords.longitude : 'N/A'}</Text>
                                        <Text>GPS Timestamp: {locationData ? locationData.timestamp : 'N/A'}</Text>
                                        <Text>GPS ISO time: {isoTime} </Text>
                                </View>
                        )}
                </View>
        );
}
