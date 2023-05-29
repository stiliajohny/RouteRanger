import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import DefaultMapAltitude from './DefaultMapAltitude';
import DefaultMapPitch from './DefaultMapPitch';
import DefaultPolylineColor from './DefaultPolylineColor';
import DefaultPolylineThickness from './DefaultPolylineThickness';
import GeneralScreenStyles from './GeneralScreenStyles';
import MapViewToggle from './MapType.js';
import SpeedUnitToggle from './SpeedUnitToggle';
import ThemeToggle from './ThemeToggle';

export default function GeneralScreen() {
    const [isSpeedUnitKMH, setSpeedUnit] = useState(true);
    const [theme, setTheme] = useState('dark');
    const [keepMapNorth, setKeepMapNorth] = useState(false);
    const [showSpeedometer, setShowSpeedometer] = useState(true);
    const [mapView, setMapView] = useState('standard');
    const [defaultMapAltitude, setDefaultMapAltitude] = useState(100);
    const [defaultMapPitch, setDefaultMapPitch] = useState(45);
    const [defaultPolylineColor, setDefaultPolylineColor] = useState('#ff0000');
    const [defaultPolylineThickness, setDefaultPolylineThickness] = useState(1);

    useEffect(() => {
        loadSettings();
    }, []);

    useEffect(() => {
        saveSettings();
        applyTheme();
    }, [
        isSpeedUnitKMH,
        theme,
        keepMapNorth,
        showSpeedometer,
        mapView,
        defaultMapAltitude,
        defaultMapPitch,
        defaultPolylineColor,
        defaultPolylineThickness,
    ]);

    const saveSettings = async () => {
        const settings = {
            isSpeedUnitKMH,
            theme,
            keepMapNorth,
            showSpeedometer,
            mapView,
            defaultMapAltitude,
            defaultMapPitch,
            defaultPolylineColor,
            defaultPolylineThickness,
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
                setDefaultMapAltitude(settings.defaultMapAltitude);
                setDefaultMapPitch(settings.defaultMapPitch);
                setDefaultPolylineColor(settings.defaultPolylineColor);
                setDefaultPolylineThickness(settings.defaultPolylineThickness);
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

    const handlePolylineColorChange = (color) => {
        setDefaultPolylineColor(color);
    };

    const colorOptions = [
        { color: '#ff0000', label: 'Red' },
        { color: '#00ff00', label: 'Green' },
        { color: '#0000ff', label: 'Blue' },
        { color: '#ffff00', label: 'Yellow' },
        { color: '#ff00ff', label: 'Magenta' },
        { color: '#00ffff', label: 'Cyan' },
        { color: '#ff8000', label: 'Orange' },
    ];

    const getHexColorLabel = (color) => {
        const index = colorOptions.findIndex((option) => option.color === color);
        if (index !== -1) {
            return colorOptions[index].label;
        }
        return '';
    };

    return (
        <KeyboardAvoidingView style={GeneralScreenStyles.container} behavior="height">
            <ScrollView contentContainerStyle={GeneralScreenStyles.scrollContainer}>

                {/* SpeedUnitToggle Card */}
                <TouchableOpacity style={GeneralScreenStyles.card}>
                    <Text style={GeneralScreenStyles.cardText}>Speed</Text>
                    <SpeedUnitToggle isSpeedUnitKMH={isSpeedUnitKMH} setSpeedUnit={setSpeedUnit} />
                </TouchableOpacity>

                {/* ThemeToggle Card */}
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

                { }
                <TouchableOpacity style={GeneralScreenStyles.card}>
                    <Text style={GeneralScreenStyles.cardText}>Keep Map North</Text>
                    <View style={GeneralScreenStyles.iconContainer}>
                        <Switch value={keepMapNorth} onValueChange={setKeepMapNorth} />
                    </View>
                </TouchableOpacity>

                {/* Show Speedometer Card */}
                <TouchableOpacity style={GeneralScreenStyles.card}>
                    <Text style={GeneralScreenStyles.cardText}>Show Speedometer</Text>
                    <View style={GeneralScreenStyles.iconContainer}>
                        <Switch value={showSpeedometer} onValueChange={setShowSpeedometer} />
                    </View>
                </TouchableOpacity>



                {/* Map View Card */}
                <MapViewToggle mapView={mapView} setMapView={setMapView} />

                {/* Default Map Altitude Card */}
                <DefaultMapAltitude defaultMapAltitude={defaultMapAltitude} setDefaultMapAltitude={setDefaultMapAltitude} />


                {/* Default Map Pitch Card */}
                <DefaultMapPitch defaultMapPitch={defaultMapPitch} setDefaultMapPitch={setDefaultMapPitch} />

                {/* Default Polyline Color Card */}
                <DefaultPolylineColor
                    defaultPolylineColor={defaultPolylineColor}
                    handlePolylineColorChange={handlePolylineColorChange}
                    colorOptions={colorOptions}
                    getHexColorLabel={getHexColorLabel}
                />

                {/* Default Polyline Thickness Card */}
                <DefaultPolylineThickness
                    defaultPolylineThickness={defaultPolylineThickness}
                    setDefaultPolylineThickness={setDefaultPolylineThickness}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
