import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function MapViewToggle({ mapView, setMapView }) {
        return (
                <TouchableOpacity style={GeneralScreenStyles.card}>
                        <Text style={GeneralScreenStyles.cardText}>Map View</Text>
                        <View style={GeneralScreenStyles.iconContainer}>
                                <TouchableOpacity onPress={() => setMapView('3D')}>
                                        <Ionicons
                                                name="md-globe"
                                                size={24}
                                                color={mapView === '3D' ? 'black' : '#ccc'}
                                                style={GeneralScreenStyles.icon}
                                        />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMapView('2D')}>
                                        <Ionicons
                                                name="md-map"
                                                size={24}
                                                color={mapView === '2D' ? 'black' : '#ccc'}
                                                style={GeneralScreenStyles.icon}
                                        />
                                </TouchableOpacity>
                        </View>
                </TouchableOpacity>
        );
}
