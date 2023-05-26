// MapViewToggle.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './GeneralScreenStyles';

export default function MapViewToggle({ mapView, setMapView }) {
        return (
                <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => setMapView('3D')}>
                                <Ionicons
                                        name="md-globe"
                                        size={24}
                                        color={mapView === '3D' ? 'black' : '#ccc'}
                                        style={styles.icon}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMapView('2D')}>
                                <Ionicons
                                        name="md-map"
                                        size={24}
                                        color={mapView === '2D' ? 'black' : '#ccc'}
                                        style={styles.icon}
                                />
                        </TouchableOpacity>
                </View>
        );
}
