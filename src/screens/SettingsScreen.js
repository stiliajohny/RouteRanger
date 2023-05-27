import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    margin: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4.84,
    elevation: 5,
  },
  icon: {
    marginRight: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default function SettingsScreen({ navigation }) {
  const items = [
    { name: 'General', icon: 'ios-settings', nav: 'General' },
    { name: 'Racing Details', icon: 'ios-speedometer', nav: 'Racing Details' },
    { name: 'Map Display', icon: 'ios-map', nav: 'Map Display' },
    { name: 'Navigation', icon: 'ios-navigate', nav: 'Navigation' },
    { name: 'Vehicle Type', icon: 'ios-car', nav: 'Vehicle Type' },
    { name: 'Speedometer', icon: 'ios-speedometer', nav: 'Speedometer' },
    { name: 'Account and Login', icon: 'ios-person', nav: 'Account and Login' },
    { name: 'Developer', icon: 'ios-code', nav: 'Developer' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => navigation.navigate(item.nav)}
        >
          <Icon name={item.icon} size={32} style={styles.icon} />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
