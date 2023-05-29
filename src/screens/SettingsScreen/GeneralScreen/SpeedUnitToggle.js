import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function SpeedUnitToggle({ isSpeedUnitKMH, setSpeedUnit }) {
        return (
                <View style={GeneralScreenStyles.iconContainer}>
                        <TouchableOpacity onPress={() => setSpeedUnit(true)}>
                                <Text
                                        style={{
                                                color: isSpeedUnitKMH ? 'black' : '#ccc',
                                                fontSize: 24,
                                                ...GeneralScreenStyles.icon
                                        }}
                                >
                                        KPH
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSpeedUnit(false)}>
                                <Text
                                        style={{
                                                color: !isSpeedUnitKMH ? 'black' : '#ccc',
                                                fontSize: 24,
                                                ...GeneralScreenStyles.icon
                                        }}
                                >
                                        MPH
                                </Text>
                        </TouchableOpacity>
                </View>
        );
}
