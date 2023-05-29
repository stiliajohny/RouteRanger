import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import GeneralScreenStyles from './GeneralScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import { ColorPicker } from 'react-native-color-picker';

export default function DefaultPolylineColor({
        defaultPolylineColor,
        handlePolylineColorChange,
        getHexColorLabel,
}) {
        const [colorPickerVisible, setColorPickerVisible] = useState(false);

        const openColorPicker = () => {
                setColorPickerVisible(true);
        };

        const closeColorPicker = () => {
                setColorPickerVisible(false);
        };

        const handleColorSelection = (color) => {
                handlePolylineColorChange(color);
                closeColorPicker();
        };

        return (
                <>
                        <TouchableOpacity style={GeneralScreenStyles.card} onPress={openColorPicker}>
                                <Text style={GeneralScreenStyles.cardText}>Default Polyline Color</Text>
                                <View style={GeneralScreenStyles.colorPickerContainer}>
                                        <View
                                                style={[GeneralScreenStyles.colorPickerButton, { backgroundColor: defaultPolylineColor }]}
                                        >
                                                {defaultPolylineColor === 'transparent' && (
                                                        <Ionicons
                                                                name="md-checkmark"
                                                                size={20}
                                                                color="#fff"
                                                                style={GeneralScreenStyles.checkmarkIcon}
                                                        />
                                                )}
                                        </View>
                                        <Text style={GeneralScreenStyles.hexColorText}>
                                                {getHexColorLabel(defaultPolylineColor)}
                                        </Text>
                                </View>
                        </TouchableOpacity>

                        {colorPickerVisible && (
                                <ColorPicker
                                        onColorSelected={handleColorSelection}
                                        defaultColor={defaultPolylineColor}
                                        style={{ flex: 1 }}
                                />
                        )}
                </>
        );
}
