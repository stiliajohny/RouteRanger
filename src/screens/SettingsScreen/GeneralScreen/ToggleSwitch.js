import React from 'react';
import { View, Switch } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function ToggleSwitch({ value, onValueChange }) {
        return (
                <View style={GeneralScreenStyles.toggleContainer}>
                        <Switch value={value} onValueChange={onValueChange} />
                </View>
        );
}
