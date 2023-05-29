import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import GeneralScreenStyles from './GeneralScreenStyles';
import SpeedUnitToggle from './SpeedUnitToggle';
import ThemeToggle from './ThemeToggle';
import MapViewToggle from './MapViewToggle';
import Slider from '@react-native-community/slider';

const colorOptions = [
    { color: '#ff0000', label: 'Red' },
    { color: '#00ff00', label: 'Green' },
    { color: '#0000ff', label: 'Blue' },
    { color: '#ffff00', label: 'Yellow' },
    { color: '#ff00ff', label: 'Magenta' },
    { color: '#800080', label: 'Purple' },
    { color: '#00ffff', label: 'Cyan' },
];

export default function GeneralScreen() {
    const [isSpeedUnitKMH, setSpeedUnit] = useState(true);
    const [theme, setTheme] = useState('dark');
    const [keepMapNorth, setKeepMapNorth] = useState(false);
    const [showSpeedometer, setShowSpeedometer] = useState(true);
    const [mapView, setMapView] = useState('3D');
    const [defaultMapAltitude, setDefaultMapAltitude] = useState(10);
    const [mapAltitude, setMapAltitude] = useState(10);
    const [defaultMapPitch, setDefaultMapPitch] = useState(45);
    const [mapPitch, setMapPitch] = useState(45);
    const [defaultPolylineColor, setDefaultPolylineColor] = useState(colorOptions[0].color);
    const [defaultPolylineThickness, setDefaultPolylineThickness] = useState(1);
    const scrollRef = useRef(null);

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

    const handleMapAltitudeChange = (value) => {
        setDefaultMapAltitude(value);
        setMapAltitude(value);
    };

    const handleMapPitchChange = (value) => {
        setDefaultMapPitch(value);
        setMapPitch(value);
    };

    const handlePolylineColorChange = (color) => {
        setDefaultPolylineColor(color);
    };

    return (
        <ScrollView contentContainerStyle={GeneralScreenStyles.screenContainer} ref={scrollRef}>
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
            <TouchableOpacity style={GeneralScreenStyles.card}>
                <Text style={GeneralScreenStyles.cardText}>Default Map Altitude: {mapAltitude}m</Text>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={10}
                    maximumValue={100}
                    step={1}
                    value={mapAltitude}
                    onValueChange={handleMapAltitudeChange}
                />
            </TouchableOpacity>
            <TouchableOpacity style={GeneralScreenStyles.card}>
                <Text style={GeneralScreenStyles.cardText}>Default Map Pitch: {mapPitch}°</Text>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={90}
                    step={1}
                    value={mapPitch}
                    onValueChange={handleMapPitchChange}
                />
            </TouchableOpacity>
            <TouchableOpacity style={GeneralScreenStyles.card}>
                <Text style={GeneralScreenStyles.cardText}>Default Polyline Color</Text>
                <View style={GeneralScreenStyles.colorOptionsContainer}>
                    {colorOptions.map((option) => (
                        <TouchableOpacity
                            key={option.color}
                            style={[
                                GeneralScreenStyles.colorOption,
                                { backgroundColor: option.color },
                            ]}
                            onPress={() => handlePolylineColorChange(option.color)}
                        >
                            {defaultPolylineColor === option.color && (
                                <Ionicons
                                    name="md-checkmark"
                                    size={20}
                                    color="#fff"
                                    style={GeneralScreenStyles.checkmarkIcon}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={GeneralScreenStyles.cardSubText}>
                    Selected Color: {colorOptions.find((option) => option.color === defaultPolylineColor)?.label}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={GeneralScreenStyles.card}>
                <Text style={GeneralScreenStyles.cardText}>Default Polyline Thickness: {defaultPolylineThickness}</Text>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0.5}
                    maximumValue={5}
                    step={0.5}
                    value={defaultPolylineThickness}
                    onValueChange={setDefaultPolylineThickness}
                />
            </TouchableOpacity>
        </ScrollView>
    );
}
