import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function MapViewToggle({ mapView, setMapView }) {
        return (
                <TouchableOpacity style={GeneralScreenStyles.card}>
                        <Text style={GeneralScreenStyles.cardText}>Map Type</Text>
                        <View style={[GeneralScreenStyles.iconContainer, { justifyContent: 'space-between' }]}>
                                <TouchableOpacity onPress={() => setMapView('standard')} style={GeneralScreenStyles.iconItem}>
                                        <View style={GeneralScreenStyles.iconItemContent}>
                                                <Ionicons
                                                        name="md-map-sharp"
                                                        size={24}
                                                        color={mapView === 'standard' ? 'black' : '#ccc'}
                                                        style={GeneralScreenStyles.icon}
                                                />
                                                <Text style={[GeneralScreenStyles.iconText, mapView === 'standard' ? { color: 'black' } : { color: '#ccc' }]}>Standard Map</Text>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMapView('hybrid')} style={GeneralScreenStyles.iconItem}>
                                        <View style={GeneralScreenStyles.iconItemContent}>
                                                <FontAwesome5
                                                        name="map-marked-alt"
                                                        size={24}
                                                        color={mapView === 'hybrid' ? 'black' : '#ccc'}
                                                        style={GeneralScreenStyles.icon}
                                                />
                                                <Text style={[GeneralScreenStyles.iconText, mapView === 'hybrid' ? { color: 'black' } : { color: '#ccc' }]}>Hybrid Map</Text>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMapView('satellite')} style={GeneralScreenStyles.iconItem}>
                                        <View style={GeneralScreenStyles.iconItemContent}>
                                                <FontAwesome5
                                                        name="globe"
                                                        size={24}
                                                        color={mapView === 'satellite' ? 'black' : '#ccc'}
                                                        style={GeneralScreenStyles.icon}
                                                />
                                                <Text style={[GeneralScreenStyles.iconText, mapView === 'satellite' ? { color: 'black' } : { color: '#ccc' }]}>Satellite Map</Text>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMapView('terrain')} style={GeneralScreenStyles.iconItem}>
                                        <View style={GeneralScreenStyles.iconItemContent}>
                                                <MaterialIcons
                                                        name="terrain"
                                                        size={24}
                                                        color={mapView === 'terrain' ? 'black' : '#ccc'}
                                                        style={GeneralScreenStyles.icon}
                                                />
                                                <Text style={[GeneralScreenStyles.iconText, mapView === 'terrain' ? { color: 'black' } : { color: '#ccc' }]}>Terrain Map</Text>
                                        </View>
                                </TouchableOpacity>
                        </View>
                </TouchableOpacity>
        );
}
