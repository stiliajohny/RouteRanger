import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function MapViewToggle({ mapView, setMapView }) {
        return (
                <TouchableOpacity style={GeneralScreenStyles.card}>
                        <Text style={GeneralScreenStyles.cardText}>Map Type</Text>
                        <View style={GeneralScreenStyles.iconContainer}>
                                <TouchableOpacity onPress={() => setMapView('standard')}>
                                        <Text style={[GeneralScreenStyles.icon, mapView === 'standard' ? { color: 'black' } : { color: '#ccc' }]}>Standard Map</Text>
                                        <Ionicons
                                                name="md-map-sharp"
                                                size={24}
                                                color={mapView === 'standard' ? 'black' : '#ccc'}
                                                style={GeneralScreenStyles.icon}
                                        />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMapView('hybrid')}>
                                        <Text style={[GeneralScreenStyles.icon, mapView === 'hybrid' ? { color: 'black' } : { color: '#ccc' }]}>Hybrid Map</Text>
                                        <FontAwesome5
                                                name="map-marked-alt"
                                                size={24}
                                                color={mapView === 'hybrid' ? 'black' : '#ccc'}
                                        />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMapView('satellite')}>
                                        <Text style={[GeneralScreenStyles.icon, mapView === 'satellite' ? { color: 'black' } : { color: '#ccc' }]}>Satellite Map</Text>
                                        <FontAwesome5
                                                name="globe"
                                                size={24}
                                                color={mapView === 'satellite' ? 'black' : '#ccc'}
                                        />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMapView('terrain')}>
                                        <Text style={[GeneralScreenStyles.icon, mapView === 'terrain' ? { color: 'black' } : { color: '#ccc' }]}>Terrain Map</Text>
                                        <MaterialIcons
                                                name="terrain"
                                                size={24}
                                                color={mapView === 'terrain' ? 'black' : '#ccc'}
                                        />
                                </TouchableOpacity>
                        </View>
                </TouchableOpacity>
        );
}
