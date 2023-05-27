import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';


export default function DeveloperScreen() {
        const [settings, setSettings] = useState(null);
        const [locationData, setLocationData] = useState(null);


        const isoTime = locationData ? new Date(locationData.timestamp).toISOString() : 'N/A';



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

        let locationSubscription;

        const fetchLocationData = async () => {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                        console.log('Permission to access location was denied');
                        return;
                }

                locationSubscription = await Location.watchPositionAsync(
                        { distanceInterval: 1 }, // Updates every 1 meter. Adjust as needed.
                        (deviceLocation) => {
                                setLocationData(deviceLocation);
                        }
                );
        };

        // Don't forget to stop watching for updates when the component unmounts.
        useEffect(() => {
                return () => {
                        if (locationSubscription) {
                                locationSubscription.remove();
                        }
                };
        }, []);


        return (
                <View>
                        {(settings && locationData) && (
                                <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Speed Unit (kph/mph):</Text>
                                                <Text>{settings.isSpeedUnitKMH ? 'kph' : 'mph'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Theme:</Text>
                                                <Text>{settings.theme}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Keep Map North:</Text>
                                                <Text>{settings.keepMapNorth ? 'Yes' : 'No'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Show Speedometer:</Text>
                                                <Text>{settings.showSpeedometer ? 'Yes' : 'No'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Map View:</Text>
                                                <Text>{settings.mapView}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>GPS Speed:</Text>
                                                <Text>{locationData ? locationData.coords.speed : 'N/A'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>GPS Accuracy:</Text>
                                                <Text>{locationData ? locationData.coords.accuracy : 'N/A'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>GPS Altitude:</Text>
                                                <Text>{locationData ? locationData.coords.altitude : 'N/A'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>GPS Altitude Accuracy:</Text>
                                                <Text>{locationData ? locationData.coords.altitudeAccuracy : 'N/A'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>GPS Heading:</Text>
                                                <Text>{locationData ? locationData.coords.heading : 'N/A'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>GPS Latitude:</Text>
                                                <Text>{locationData ? locationData.coords.latitude : 'N/A'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>GPS Longitude:</Text>
                                                <Text>{locationData ? locationData.coords.longitude : 'N/A'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>GPS Timestamp:</Text>
                                                <Text>{locationData ? locationData.timestamp : 'N/A'}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold' }}>GPS ISO time:</Text>
                                                <Text>{isoTime}</Text>
                                        </View>
                                </View>


                        )}
                </View>
        );
}
