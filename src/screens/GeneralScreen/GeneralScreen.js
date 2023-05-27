import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import GeneralScreenStyles from './GeneralScreenStyles';
import SpeedUnitToggle from './SpeedUnitToggle';
import ThemeToggle from './ThemeToggle';
import MapViewToggle from './MapViewToggle';

export default function GeneralScreen() {
    const [isSpeedUnitKMH, setSpeedUnit] = useState(true);
    const [theme, setTheme] = useState('dark');
    const [keepMapNorth, setKeepMapNorth] = useState(false);
    const [showSpeedometer, setShowSpeedometer] = useState(true);
    const [mapView, setMapView] = useState('3D');

    useEffect(() => {
        loadSettings();
    }, []);

    useEffect(() => {
        saveSettings();
        applyTheme();
    }, [isSpeedUnitKMH, theme, keepMapNorth, showSpeedometer, mapView]);

    const saveSettings = async () => {
        const settings = {
            isSpeedUnitKMH,
            theme,
            keepMapNorth,
            showSpeedometer,
            mapView,
        };
        try {
            await SecureStore.setItemAsync('settings', JSON.stringify(settings));
        } catch (error) {
            console.log('Error saving settings:', error);
        }
    };

    const loadSettings = async () => {
        try {
            const value = await SecureStore.getItemAsync('settings');
            if (value !== null) {
                const settings = JSON.parse(value);
                setSpeedUnit(settings.isSpeedUnitKMH);
                setTheme(settings.theme);
                setKeepMapNorth(settings.keepMapNorth);
                setShowSpeedometer(settings.showSpeedometer);
                setMapView(settings.mapView);
            }
        } catch (error) {
            console.log('Error loading settings:', error);
        }
    };

    const applyTheme = () => {
        // Apply theme styles to your app here
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        <View style={GeneralScreenStyles.screenContainer}>
            <TouchableOpacity style={GeneralScreenStyles.card}>
                <Text style={GeneralScreenStyles.cardText}>Speed</Text>
                <SpeedUnitToggle isSpeedUnitKMH={isSpeedUnitKMH} setSpeedUnit={setSpeedUnit} />
            </TouchableOpacity>
            <TouchableOpacity style={GeneralScreenStyles.card}>
                <Text style={GeneralScreenStyles.cardText}>Theme</Text>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </TouchableOpacity>
            <TouchableOpacity style={GeneralScreenStyles.card}>
                <Text style={GeneralScreenStyles.cardText}>Keep Map North</Text>
                <View style={GeneralScreenStyles.iconContainer}>
                    <Switch value={keepMapNorth} onValueChange={setKeepMapNorth} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={GeneralScreenStyles.card}>
                <Text style={GeneralScreenStyles.cardText}>Show Speedometer</Text>
                <View style={GeneralScreenStyles.iconContainer}>
                    <Switch value={showSpeedometer} onValueChange={setShowSpeedometer} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={GeneralScreenStyles.card}>
                <Text style={GeneralScreenStyles.cardText}>Map View</Text>
                <MapViewToggle mapView={mapView} setMapView={setMapView} />
            </TouchableOpacity>
        </View>
    );
}
