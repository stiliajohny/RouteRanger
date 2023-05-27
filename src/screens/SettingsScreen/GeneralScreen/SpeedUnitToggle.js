import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function SpeedUnitToggle({ isSpeedUnitKMH, setSpeedUnit }) {
        return (
                <View style={GeneralScreenStyles.iconContainer}>
                        <TouchableOpacity onPress={() => setSpeedUnit(true)}>
                                <Ionicons
                                        name="md-speedometer"
                                        size={24}
                                        color={isSpeedUnitKMH ? 'black' : '#ccc'}
                                        style={GeneralScreenStyles.icon}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSpeedUnit(false)}>
                                <Ionicons
                                        name="md-walk"
                                        size={24}
                                        color={!isSpeedUnitKMH ? 'black' : '#ccc'}
                                        style={GeneralScreenStyles.icon}
                                />
                        </TouchableOpacity>
                </View>
        );
}
