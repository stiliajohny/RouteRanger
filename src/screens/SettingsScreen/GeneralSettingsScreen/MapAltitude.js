import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function DefaultMapAltitude({ defaultMapAltitude, setDefaultMapAltitude }) {
        return (
                <View style={GeneralScreenStyles.container}>
                        <View style={GeneralScreenStyles.textContainer}>
                                <Text style={GeneralScreenStyles.cardText}>Default Map Altitude</Text>
                        </View>
                        <View style={GeneralScreenStyles.toggleContainer}>
                                <TouchableOpacity onPress={() => setDefaultMapAltitude(Math.max(10, defaultMapAltitude - 1))} style={GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>-</Text>
                                </TouchableOpacity>
                                <View style={GeneralScreenStyles.valueContainer}>
                                        <Text style={GeneralScreenStyles.cardText}>{defaultMapAltitude}</Text>
                                </View>
                                <TouchableOpacity onPress={() => setDefaultMapAltitude(Math.min(100, defaultMapAltitude + 1))} style={GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>+</Text>
                                </TouchableOpacity>
                        </View>
                </View>
        );
}
