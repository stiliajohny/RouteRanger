import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';
import { Ionicons } from '@expo/vector-icons';


export default function DefaultPolylineColor({
        defaultPolylineColor,
        handlePolylineColorChange,
        colorOptions,
        getHexColorLabel,
}) {
        return (
                <TouchableOpacity style={GeneralScreenStyles.card}>
                        <Text style={GeneralScreenStyles.cardText}>Default Polyline Color</Text>
                        <View style={GeneralScreenStyles.colorOptionsContainer}>
                                {colorOptions.map((option) => (
                                        <TouchableOpacity
                                                key={option.color}
                                                style={[
                                                        GeneralScreenStyles.colorOption,
                                                        { backgroundColor: option.color },
                                                ]}
                                                onPress={() => handlePolylineColorChange(option.color)}
                                        >

                                                {defaultPolylineColor === option.color && (
                                                        <Ionicons
                                                                name="md-checkmark"
                                                                size={20}
                                                                color="#fff"
                                                                style={GeneralScreenStyles.checkmarkIcon}
                                                        />
                                                )}
                                        </TouchableOpacity>
                                ))}
                        </View>
                        <Text style={GeneralScreenStyles.cardSubText}>
                                Selected Color: {getHexColorLabel(defaultPolylineColor)} - {defaultPolylineColor}
                        </Text>
                </TouchableOpacity>
        );
}
