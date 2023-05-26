// GeneralScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Appearance } from 'react-native';
import { getThemeStyles } from '../../CommonStyles';

import styles from './GeneralScreenStyles';
import ToggleSwitch from './ToggleSwitch';
import ThemeToggle from './ThemeToggle';
import MapViewToggle from './MapViewToggle';
import SpeedUnitToggle from './SpeedUnitToggle';

export default function GeneralScreen() {
    const [isSpeedUnitKMH, setSpeedUnit] = useState(true);
    const [theme, setTheme] = useState(Appearance.getColorScheme() || 'dark');
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
        const themeStyles = getThemeStyles(theme);
        // Apply theme styles to your app here
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>Speed</Text>
                <SpeedUnitToggle isSpeedUnitKMH={isSpeedUnitKMH} setSpeedUnit={setSpeedUnit} />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Theme</Text>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Keep Map North</Text>
                <ToggleSwitch value={keepMapNorth} onValueChange={setKeepMapNorth} />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Show Speedometer</Text>
                <ToggleSwitch value={showSpeedometer} onValueChange={setShowSpeedometer} />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Map View</Text>
                <MapViewToggle mapView={mapView} setMapView={setMapView} />
            </View>
        </View>
    );
}
