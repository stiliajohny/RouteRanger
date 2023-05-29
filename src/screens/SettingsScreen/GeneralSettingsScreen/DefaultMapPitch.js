import React from 'react';
import { View, Text } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';
import Slider from '@react-native-community/slider';


export default function DefaultMapPitch({ defaultMapPitch, setDefaultMapPitch }) {
        return (
                <View style={GeneralScreenStyles.card}>
                        <Text style={GeneralScreenStyles.cardText}>Default Map Pitch</Text>
                        <View style={GeneralScreenStyles.sliderContainer}>
                                <Slider
                                        style={GeneralScreenStyles.slider}
                                        minimumValue={0}
                                        maximumValue={90}
                                        step={1}
                                        value={defaultMapPitch}
                                        onValueChange={setDefaultMapPitch}
                                />
                                <Text style={GeneralScreenStyles.sliderValue}>{defaultMapPitch}°</Text>
                        </View>
                </View>
        );
}
