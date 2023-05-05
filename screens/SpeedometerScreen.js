// screens/SpeedometerScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SpeedometerScreen() {
    const [speed, setSpeed] = useState(0);

    const simulateSpeedChange = () => {
        const newSpeed = Math.floor(Math.random() * 121); // Random speed between 0 and 120
        setSpeed(newSpeed);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.speedText}>{speed} km/h</Text>
            <Button title="Simulate Speed Change" onPress={simulateSpeedChange} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    speedText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
