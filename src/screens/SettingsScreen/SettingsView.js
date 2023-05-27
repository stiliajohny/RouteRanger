import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './SettingsListStyles';

const SettingsView = ({ items, onItemPress }) => (
        <ScrollView contentContainerStyle={styles.container}>
                {items.map((item, index) => (
                        <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => onItemPress(item.nav)}
                        >
                                <Icon name={item.icon} size={32} style={styles.icon} />
                                <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                ))}
        </ScrollView>
);

export default SettingsView;
