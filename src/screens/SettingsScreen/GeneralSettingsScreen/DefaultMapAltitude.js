import React from 'react';
import { View, Text } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';
import Slider from '@react-native-community/slider';

export default function DefaultMapAltitude({ defaultMapAltitude, setDefaultMapAltitude }) {
        return (
                <View style={GeneralScreenStyles.card}>
                        <Text style={GeneralScreenStyles.cardText}>Default Map Altitude</Text>
                        <View style={GeneralScreenStyles.sliderContainer}>
                                <Slider
                                        style={GeneralScreenStyles.slider}
                                        minimumValue={10}
                                        maximumValue={100}
                                        step={1}
                                        value={defaultMapAltitude}
                                        onValueChange={setDefaultMapAltitude}
                                />
                                <Text style={GeneralScreenStyles.sliderValue}>{defaultMapAltitude}</Text>
                        </View>
                </View>
        );
}
