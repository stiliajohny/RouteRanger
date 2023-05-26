// ThemeToggle.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './GeneralScreenStyles';

export default function ThemeToggle({ theme, toggleTheme }) {
        return (
                <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={toggleTheme}>
                                <Ionicons
                                        name="md-moon"
                                        size={24}
                                        color={theme === 'dark' ? 'black' : '#ccc'}
                                        style={styles.icon}
                                />
                                {theme === 'dark' && <Text style={styles.text}>Dark</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleTheme}>
                                <Ionicons
                                        name="md-sunny"
                                        size={24}
                                        color={theme === 'light' ? 'black' : '#ccc'}
                                        style={styles.icon}
                                />
                                {theme === 'light' && <Text style={styles.text}>Light</Text>}
                        </TouchableOpacity>
                </View>
        );
}
