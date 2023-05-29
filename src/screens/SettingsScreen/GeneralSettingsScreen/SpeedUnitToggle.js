import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function SpeedUnitToggle({ isSpeedUnitKMH, setSpeedUnit }) {
        return (
                <View style={GeneralScreenStyles.container}>
                        <View style={GeneralScreenStyles.textContainer}>
                                <Text style={GeneralScreenStyles.cardText}>Speed Unit</Text>
                        </View>
                        <View style={GeneralScreenStyles.toggleContainer}>
                                <TouchableOpacity onPress={() => setSpeedUnit(true)} style={isSpeedUnitKMH ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>KPH</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSpeedUnit(false)} style={!isSpeedUnitKMH ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>MPH</Text>
                                </TouchableOpacity>
                        </View>
                </View>
        );
}
