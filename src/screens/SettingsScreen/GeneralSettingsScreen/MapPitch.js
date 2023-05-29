import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function DefaultMapPitch({ defaultMapPitch, setDefaultMapPitch }) {
        return (
                <View style={GeneralScreenStyles.container}>
                        <View style={GeneralScreenStyles.textContainer}>
                                <Text style={GeneralScreenStyles.cardText}>Default Map Pitch</Text>
                        </View>
                        <View style={GeneralScreenStyles.toggleContainer}>
                                <TouchableOpacity onPress={() => setDefaultMapPitch(Math.max(0, defaultMapPitch - 1))} style={GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>-</Text>
                                </TouchableOpacity>
                                <View style={GeneralScreenStyles.valueContainer}>
                                        <Text style={GeneralScreenStyles.cardText}>{defaultMapPitch}°</Text>
                                </View>
                                <TouchableOpacity onPress={() => setDefaultMapPitch(Math.min(90, defaultMapPitch + 1))} style={GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>+</Text>
                                </TouchableOpacity>
                        </View>
                </View>
        );
}
