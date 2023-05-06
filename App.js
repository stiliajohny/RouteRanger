// App.js
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from './screens/mainScreen/MainScreen'
import SettingsScreen from './screens/SettingsScreen'
import GeneralScreen from './screens/GeneralScreen'
import MapDisplayScreen from './screens/MapDisplayScreen'
import NavigationScreen from './screens/NavigationScreen'
import VehicleTypeScreen from './screens/VehicleTypeScreen'
import SpeedometerScreen from './screens/SpeedometerScreen'
import AccountLoginScreen from './screens/AccountLoginScreen'

const Stack = createStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="General" component={GeneralScreen} />
        <Stack.Screen name="Map Display" component={MapDisplayScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="Vehicle Type" component={VehicleTypeScreen} />
        <Stack.Screen name="Speedometer" component={SpeedometerScreen} />
        <Stack.Screen name="Account and Login" component={AccountLoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
