import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function DeveloperScreen() {
        const [settings, setSettings] = useState(null);

        useEffect(() => {
                loadSettings();
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

        return (
                <View>
                        {settings && (
                                <View>
                                        <Text>Speed Unit (kph/mph): {settings.isSpeedUnitKMH ? 'kph' : 'mph'}</Text>
                                        <Text>Theme: {settings.theme}</Text>
                                        <Text>Keep Map North: {settings.keepMapNorth ? 'Yes' : 'No'}</Text>
                                        <Text>Show Speedometer: {settings.showSpeedometer ? 'Yes' : 'No'}</Text>
                                        <Text>Map View: {settings.mapView}</Text>
                                </View>
                        )}
                </View>
        );
}
