import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function DefaultPolylineThickness({ defaultPolylineThickness, setDefaultPolylineThickness }) {
        return (
                <View style={GeneralScreenStyles.container}>
                        <View style={GeneralScreenStyles.textContainer}>
                                <Text style={GeneralScreenStyles.cardText}>Default Polyline Thickness</Text>
                        </View>
                        <View style={GeneralScreenStyles.toggleContainer}>
                                <TouchableOpacity
                                        onPress={() =>
                                                setDefaultPolylineThickness(Math.max(0.5, defaultPolylineThickness - 0.5))
                                        }
                                        style={GeneralScreenStyles.icon}
                                >
                                        <Text style={GeneralScreenStyles.iconText}>-</Text>
                                </TouchableOpacity>
                                <View style={GeneralScreenStyles.valueContainer}>
                                        <Text style={GeneralScreenStyles.cardText}>{defaultPolylineThickness}</Text>
                                </View>
                                <TouchableOpacity
                                        onPress={() =>
                                                setDefaultPolylineThickness(Math.min(5, defaultPolylineThickness + 0.5))
                                        }
                                        style={GeneralScreenStyles.icon}
                                >
                                        <Text style={GeneralScreenStyles.iconText}>+</Text>
                                </TouchableOpacity>
                        </View>
                </View>
        );
}
