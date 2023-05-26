import { StyleSheet } from 'react-native';

export const COLORS = {
        dark: {
                primary: '#3f51b5',
                secondary: '#f50057',
                text: '#ffffff',
                background: '#1c1c1c',
                button: '#ffffff',
                buttonShadow: '#000000',
                buttonText: '#000000',
        },
        light: {
                primary: '#3f51b5',
                secondary: '#f50057',
                text: '#333333',
                background: '#F5F5F5',
                button: '#ffffff',
                buttonShadow: '#000000',
                buttonText: '#000000',
        },
        auto: {
                primary: '#3f51b5',
                secondary: '#f50057',
                text: '#333333',
                background: '#F5F5F5',
                button: '#ffffff',
                buttonShadow: '#000000',
                buttonText: '#000000',
        },
};

export const getThemeStyles = (theme) => {
        return StyleSheet.create({
                background: {
                        backgroundColor: COLORS[theme].background,
                },
                text: {
                        color: COLORS[theme].text,
                },
                // Add more styles as needed
        });
};

export default StyleSheet.create({
        // Add common styles that are not theme-dependent
});
