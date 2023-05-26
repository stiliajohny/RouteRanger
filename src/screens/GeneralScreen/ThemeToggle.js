import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GeneralScreenStyles from './GeneralScreenStyles';

export default function ThemeToggle({ theme, setTheme }) {
        const toggleTheme = () => {
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
        };

        return (
                <View>
                        {/* Add your JSX content here */}
                </View>
        );
}
