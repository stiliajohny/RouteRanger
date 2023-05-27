import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MainScreen from './src/screens/SettingsScreen/MainScreen/MainScreen'
import GeneralScreen from './src/screens/SettingsScreen/GeneralScreen/GeneralScreen'
import SettingsScreen from './src/screens/SettingsScreen/SettingsScreen'
import MapDisplayScreen from './src/screens/SettingsScreen/MapDisplayScreen/MapDisplayScreen.js'
import NavigationScreen from './src/screens/SettingsScreen/NavigationScreen/NavigationScreen.js'
import VehicleTypeScreen from './src/screens/SettingsScreen/VehicleTypeScreen/VehicleTypeScreen.js'
import SpeedometerScreen from './src/screens/SettingsScreen/SpeedometerScreen/SpeedometerScreen.js'
import AccountLoginScreen from './src/screens/SettingsScreen/AccountLoginScreen/AccountLoginScreen.js'
import DeveloperScreen from './src/screens/SettingsScreen/DeveloperScreen/DeveloperScreen.js'
import CommonStyles from './src/CommonStyles' // Import CommonStyles

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer style={CommonStyles.background}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="General" component={GeneralScreen} />
        <Stack.Screen name="Map Display" component={MapDisplayScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="Vehicle Type" component={VehicleTypeScreen} />
        <Stack.Screen name="Speedometer" component={SpeedometerScreen} />
        <Stack.Screen name="Account and Login" component={AccountLoginScreen} />
        <Stack.Screen name="Developer" component={DeveloperScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
