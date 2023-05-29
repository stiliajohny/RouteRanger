import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function SpeedUnitToggle({ isSpeedUnitKMH, setSpeedUnit }) {
        return (
                <View style={GeneralScreenStyles.iconContainer}>
                        <TouchableOpacity onPress={() => setSpeedUnit(true)} style={GeneralScreenStyles.iconItem}>
                                <FontAwesome5
                                        name={isSpeedUnitKMH ? 'tachometer-alt' : 'tachometer-alt'}
                                        size={24}
                                        color={isSpeedUnitKMH ? 'black' : '#ccc'}
                                        style={GeneralScreenStyles.icon}
                                />
                                <Text style={[GeneralScreenStyles.iconText, { color: isSpeedUnitKMH ? 'black' : '#ccc' }]}>KPH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSpeedUnit(false)} style={GeneralScreenStyles.iconItem}>
                                <FontAwesome5
                                        name={!isSpeedUnitKMH ? 'tachometer-alt' : 'tachometer-alt'}
                                        size={24}
                                        color={!isSpeedUnitKMH ? 'black' : '#ccc'}
                                        style={GeneralScreenStyles.icon}
                                />
                                <Text style={[GeneralScreenStyles.iconText, { color: !isSpeedUnitKMH ? 'black' : '#ccc' }]}>MPH</Text>
                        </TouchableOpacity>
                </View>
        );
}
