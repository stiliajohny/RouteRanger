import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 8,
    },
    toggleContainer: {
        alignItems: 'flex-end',
    },
});

export default function GeneralScreen() {
    const colorScheme = useColorScheme();
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

    const renderThemeIcon = () => {
        let icon;
        switch (theme) {
            case 'dark':
                icon = <Ionicons name="md-moon" size={24} color="black" />;
                break;
            case 'light':
                icon = <Ionicons name="md-sunny" size={24} color="black" />;
                break;
            case 'auto':
                icon = <Ionicons name="md-sync" size={24} color="black" />;
                break;
            default:
                icon = null;
                break;
        }
        return icon;
    };

    const renderMapViewIcon = () => {
        let icon;
        switch (mapView) {
            case '3D':
                icon = <Ionicons name="md-globe" size={24} color="black" />;
                break;
            case '2D':
                icon = <Ionicons name="md-map" size={24} color="black" />;
                break;
            default:
                icon = null;
                break;
        }
        return icon;
    };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>Speed (km/h)</Text>
                <View style={styles.toggleContainer}>
                    <Switch value={isSpeedUnitKMH} onValueChange={setSpeedUnit} />
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Theme</Text>
                <TouchableOpacity onPress={() => setTheme('dark')} style={styles.iconContainer}>
                    <Ionicons name="md-moon" size={24} color={theme === 'dark' ? 'black' : '#ccc'} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTheme('light')} style={styles.iconContainer}>
                    <Ionicons name="md-sunny" size={24} color={theme === 'light' ? 'black' : '#ccc'} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTheme('auto')} style={styles.iconContainer}>
                    <Ionicons name="md-sync" size={24} color={theme === 'auto' ? 'black' : '#ccc'} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Keep Map North</Text>
                <View style={styles.toggleContainer}>
                    <Switch value={keepMapNorth} onValueChange={setKeepMapNorth} />
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Show Speedometer</Text>
                <View style={styles.toggleContainer}>
                    <Switch value={showSpeedometer} onValueChange={setShowSpeedometer} />
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Map View</Text>
                <TouchableOpacity onPress={() => setMapView('3D')} style={styles.iconContainer}>
                    <Ionicons name="md-globe" size={24} color={mapView === '3D' ? 'black' : '#ccc'} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMapView('2D')} style={styles.iconContainer}>
                    <Ionicons name="md-map" size={24} color={mapView === '2D' ? 'black' : '#ccc'} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
