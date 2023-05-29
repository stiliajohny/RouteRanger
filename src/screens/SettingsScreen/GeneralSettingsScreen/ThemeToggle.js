import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function ThemeToggle({ theme, toggleTheme }) {
        return (
                <View style={GeneralScreenStyles.container}>
                        <Text style={GeneralScreenStyles.cardText}>Theme</Text>
                        <View style={GeneralScreenStyles.toggleContainer}>
                                <TouchableOpacity onPress={toggleTheme} style={theme === 'dark' ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Ionicons name="md-moon" size={24} color='white' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleTheme} style={theme === 'light' ? GeneralScreenStyles.iconActive : GeneralScreenStyles.icon}>
                                        <Ionicons name="md-sunny" size={24} color='white' />
                                </TouchableOpacity>
                        </View>
                </View>
        );
}
