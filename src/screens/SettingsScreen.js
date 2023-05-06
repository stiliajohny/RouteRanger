// screens/SettingsScreen.js
import React from 'react'
import { View, Text, Button } from 'react-native'

export default function SettingsScreen ({ navigation }) {
  return (
        <View>
            <Button title="General" onPress={() => navigation.navigate('General')} />
            <Button title="Map Display" onPress={() => navigation.navigate('Map Display')} />
            <Button title="Navigation" onPress={() => navigation.navigate('Navigation')} />
            <Button title="Vehicle Type" onPress={() => navigation.navigate('Vehicle Type')} />
            <Button title="Speedometer" onPress={() => navigation.navigate('Speedometer')} />
            <Button title="Account and Login" onPress={() => navigation.navigate('Account and Login')} />
        </View>
  )
}
