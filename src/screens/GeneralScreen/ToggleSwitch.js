import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
        container: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
        },
        text: {
                flex: 1,
        },
        toggleContainer: {
                flexDirection: 'row',
                alignItems: 'center',
        },
});

export default function ToggleSwitch({ label, value, onValueChange }) {
        return (
                <View style={styles.container}>
                        <Text style={styles.text}>{label}</Text>
                        <View style={styles.toggleContainer}>
                                <Switch value={value} onValueChange={onValueChange} />
                        </View>
                </View>
        );
}
