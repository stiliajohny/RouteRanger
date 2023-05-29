import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function MapDirectionToggle({ keepMapNorth, setKeepMapNorth }) {
        return (
                <View style={GeneralScreenStyles.container}>
                        <View style={GeneralScreenStyles.textContainer}>
                                <Text style={GeneralScreenStyles.cardText}>Keep Map North</Text>
                        </View>
                        <View style={GeneralScreenStyles.toggleContainer}>
                                <TouchableOpacity onPress={() => setKeepMapNorth(true)} style={keepMapNorth ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>I</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setKeepMapNorth(false)} style={!keepMapNorth ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>O</Text>
                                </TouchableOpacity>
                        </View>
                </View>
        );
}
