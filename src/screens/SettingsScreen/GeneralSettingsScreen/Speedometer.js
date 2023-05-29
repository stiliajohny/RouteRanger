import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function SpeedometerToggle({ showSpeedometer, setShowSpeedometer }) {
        return (
                <View style={GeneralScreenStyles.container}>
                        <View style={GeneralScreenStyles.textContainer}>
                                <Text style={GeneralScreenStyles.cardText}>Show Speedometer</Text>
                        </View>
                        <View style={GeneralScreenStyles.toggleContainer}>
                                <TouchableOpacity onPress={() => setShowSpeedometer(true)} style={showSpeedometer ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>I</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setShowSpeedometer(false)} style={!showSpeedometer ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Text style={GeneralScreenStyles.iconText}>O</Text>
                                </TouchableOpacity>
                        </View>
                </View>
        );
}
