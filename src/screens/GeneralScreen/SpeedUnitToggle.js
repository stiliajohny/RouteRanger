// SpeedUnitToggle.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './GeneralScreenStyles';

export default function SpeedUnitToggle({ isSpeedUnitKMH, setSpeedUnit }) {
        return (
                <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => setSpeedUnit(true)}>
                                <Ionicons
                                        name="md-speedometer"
                                        size={24}
                                        color={isSpeedUnitKMH ? 'black' : '#ccc'}
                                        style={styles.icon}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSpeedUnit(false)}>
                                <Ionicons
                                        name="md-walk"
                                        size={24}
                                        color={!isSpeedUnitKMH ? 'black' : '#ccc'}
                                        style={styles.icon}
                                />
                        </TouchableOpacity>
                </View>
        );
}
