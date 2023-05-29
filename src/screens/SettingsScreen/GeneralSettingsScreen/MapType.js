import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function MapViewToggle({ mapView, setMapView }) {
        return (
                <View style={GeneralScreenStyles.container}>
                        <View style={GeneralScreenStyles.textContainer}>
                                <Text style={GeneralScreenStyles.cardText}>Map Type</Text>
                        </View>
                        <View style={[GeneralScreenStyles.toggleContainer, { justifyContent: 'space-between' }]}>
                                <TouchableOpacity onPress={() => setMapView('standard')} style={mapView === 'standard' ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>Standard</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMapView('hybrid')} style={mapView === 'hybrid' ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>Hybrid</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMapView('satellite')} style={mapView === 'satellite' ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>Satellite</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMapView('terrain')} style={mapView === 'terrain' ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>Terrain</Text>
                                </TouchableOpacity>
                        </View>
                </View>
        );
}
