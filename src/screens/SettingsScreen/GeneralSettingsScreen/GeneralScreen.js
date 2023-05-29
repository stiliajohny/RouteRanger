import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import DefaultMapAltitude from './MapAltitude';
import DefaultMapPitch from './MapPitch';
import DefaultPolylineColor from './PolylineColor';
import DefaultPolylineThickness from './PolylineThickness';
import GeneralScreenStyles from './GeneralScreenStyles';
import MapViewToggle from './MapType.js';
import SpeedUnitToggle from './SpeedUnitToggle';
import ThemeToggle from './ThemeToggle';
import MapDirectionToggle from './MapHeading';
import SpeedometerToggle from './Speedometer';

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

                <Text style={GeneralScreenStyles.title}>General Settings</Text>
                <View style={GeneralScreenStyles.lineStyle} />

                {/* SpeedUnitToggle Card */}
                <TouchableOpacity style={GeneralScreenStyles.card}>
                    <SpeedUnitToggle isSpeedUnitKMH={isSpeedUnitKMH} setSpeedUnit={setSpeedUnit} />
                </TouchableOpacity>

                {/* ThemeToggle Card */}
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

                {/* Map Direction Card */}
                <TouchableOpacity style={GeneralScreenStyles.card}>
                    <MapDirectionToggle keepMapNorth={keepMapNorth} setKeepMapNorth={setKeepMapNorth} />
                </TouchableOpacity>



                {/* SpeedometerToggle Card */}
                <TouchableOpacity style={GeneralScreenStyles.card}>
                    <SpeedometerToggle showSpeedometer={showSpeedometer} setShowSpeedometer={setShowSpeedometer} />
                </TouchableOpacity>

                <Text style={GeneralScreenStyles.title}>Map Settings</Text>
                <View style={GeneralScreenStyles.lineStyle} />


                {/* Map View Card */}
                <MapViewToggle mapView={mapView} setMapView={setMapView} />

                {/* Default Map Altitude Card */}
                <DefaultMapAltitude defaultMapAltitude={defaultMapAltitude} setDefaultMapAltitude={setDefaultMapAltitude} />

                {/* Default Map Pitch Card */}
                <DefaultMapPitch defaultMapPitch={defaultMapPitch} setDefaultMapPitch={setDefaultMapPitch} />

                <Text style={GeneralScreenStyles.title}>Line Settings</Text>
                <View style={GeneralScreenStyles.lineStyle} />


                {/* Default Polyline Thickness Card */}
                <DefaultPolylineThickness
                    defaultPolylineThickness={defaultPolylineThickness}
                    setDefaultPolylineThickness={setDefaultPolylineThickness}
                />

                {/* Default Polyline Color Card */}
                <DefaultPolylineColor
                    defaultPolylineColor={defaultPolylineColor}
                    handlePolylineColorChange={handlePolylineColorChange}
                    colorOptions={colorOptions}
                    getHexColorLabel={getHexColorLabel}
                />


            </ScrollView>
        </KeyboardAvoidingView>
    );
}
