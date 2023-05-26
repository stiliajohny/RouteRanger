// ToggleSwitch.js
import React from 'react';
import { View, Switch } from 'react-native';
import styles from './GeneralScreenStyles';

export default function ToggleSwitch({ value, onValueChange }) {
        return (
                <View style={styles.toggleContainer}>
                        <Switch value={value} onValueChange={onValueChange} />
                </View>
        );
}
