import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import GeneralScreenStyles from './GeneralScreenStyles';
import SpeedUnitToggle from './SpeedUnitToggle';
import ThemeToggle from './ThemeToggle';
import MapViewToggle from './MapViewToggle';
import Slider from '@react-native-community/slider';

export default function GeneralScreen() {
    const [isSpeedUnitKMH, setSpeedUnit] = useState(true);
    const [theme, setTheme] = useState('dark');
    const [keepMapNorth, setKeepMapNorth] = useState(false);
    const [showSpeedometer, setShowSpeedometer] = useState(true);
    const [mapView, setMapView] = useState('3D');
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
                    <Text style={GeneralScreenStyles.cardText}>Default Map Altitude</Text>
                    <View style={GeneralScreenStyles.sliderContainer}>
                        <Slider
                            style={GeneralScreenStyles.slider}
                            minimumValue={10}
                            maximumValue={100}
                            step={1}
                            value={defaultMapAltitude}
                            onValueChange={setDefaultMapAltitude}
                        />
                        <Text style={GeneralScreenStyles.sliderValue}>{defaultMapAltitude}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={GeneralScreenStyles.card}>
                    <Text style={GeneralScreenStyles.cardText}>Default Map Pitch</Text>
                    <View style={GeneralScreenStyles.sliderContainer}>
                        <Slider
                            style={GeneralScreenStyles.slider}
                            minimumValue={0}
                            maximumValue={90}
                            step={1}
                            value={defaultMapPitch}
                            onValueChange={setDefaultMapPitch}
                        />
                        <Text style={GeneralScreenStyles.sliderValue}>{defaultMapPitch}°</Text>
                    </View>
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
                                <View style={GeneralScreenStyles.colorOptionLabelContainer}>
                                </View>
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
                        Selected Color: {getHexColorLabel(defaultPolylineColor)} - {defaultPolylineColor}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={GeneralScreenStyles.card}>
                    <Text style={GeneralScreenStyles.cardText}>Default Polyline Thickness</Text>
                    <View style={GeneralScreenStyles.sliderContainer}>
                        <Slider
                            style={GeneralScreenStyles.slider}
                            minimumValue={0.5}
                            maximumValue={5}
                            step={0.5}
                            value={defaultPolylineThickness}
                            onValueChange={setDefaultPolylineThickness}
                        />
                        <Text style={GeneralScreenStyles.sliderValue}>{defaultPolylineThickness}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
