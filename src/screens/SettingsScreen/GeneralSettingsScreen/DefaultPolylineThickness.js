import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function DefaultPolylineThickness({ defaultPolylineThickness, setDefaultPolylineThickness }) {
        return (
                <View style={GeneralScreenStyles.card}>
                        <Text style={GeneralScreenStyles.cardText}>Default Polyline Thickness</Text>
                        <View style={GeneralScreenStyles.sliderContainer}>
                                <Slider
                                        style={GeneralScreenStyles.slider}
                                        minimumValue={0.5}
                                        maximumValue={5}
                                        step={0.5}
                                        value={defaultPolylineThickness}
                                        onValueChange={setDefaultPolylineThickness}
                                />
                                <Text style={GeneralScreenStyles.sliderValue}>{defaultPolylineThickness}</Text>
                        </View>
                </View>
        );
}
