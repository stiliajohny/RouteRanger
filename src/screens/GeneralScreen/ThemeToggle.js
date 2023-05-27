import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function ThemeToggle({ theme, toggleTheme }) {
        return (
                <View style={GeneralScreenStyles.iconContainer}>
                        <TouchableOpacity onPress={toggleTheme}>
                                <Ionicons
                                        name="md-moon"
                                        size={24}
                                        color={theme === 'dark' ? 'black' : '#ccc'}
                                        style={GeneralScreenStyles.icon}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleTheme}>
                                <Ionicons
                                        name="md-sunny"
                                        size={24}
                                        color={theme === 'light' ? 'black' : '#ccc'}
                                        style={GeneralScreenStyles.icon}
                                />
                        </TouchableOpacity>
                </View>
        );
}
