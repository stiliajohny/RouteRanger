// screens/VehicleTypeScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const vehicleTypes = [
    { id: '1', type: 'Car' },
    { id: '2', type: 'Bike' },
    { id: '3', type: 'Truck' },
    { id: '4', type: 'Bus' },
];

export default function VehicleTypeScreen() {
    const [selectedVehicleType, setSelectedVehicleType] = useState(null);

    const onSelectVehicleType = (type) => {
        setSelectedVehicleType(type);
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.listItem} onPress={() => onSelectVehicleType(item.type)}>
                <Text style={styles.listItemText}>{item.type}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={vehicleTypes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            {selectedVehicleType && <Text style={styles.selectedVehicleType}>Selected Vehicle Type: {selectedVehicleType}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    listItem: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    listItemText: {
        fontSize: 18,
    },
    selectedVehicleType: {
        marginTop: 20,
        fontSize: 18,
    },
});
