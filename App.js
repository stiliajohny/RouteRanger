import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import MainScreen from './src/screens/MainScreen/MainScreen.js';
// import GeneralScreen from './src/screens/SettingsScreen/GeneralSettingsScreen/GeneralScreen.js';
// import SettingsScreen from './src/screens/SettingsScreen/SettingsScreen';
// import NavigationScreen from './src/screens/SettingsScreen/NavigationScreen/NavigationScreen.js';
// import VehicleTypeScreen from './src/screens/SettingsScreen/VehicleTypeScreen/VehicleTypeScreen.js';
// import SpeedometerScreen from './src/screens/SettingsScreen/SpeedometerScreen/SpeedometerScreen.js';
// import AccountLoginScreen from './src/screens/SettingsScreen/AccountLoginScreen/AccountLoginScreen.js';
// import DeveloperScreen from './src/screens/SettingsScreen/DeveloperScreen/DeveloperScreen.js';
import CommonStyles from './src/CommonStyles';

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme === 'dark' ? DarkTheme : DefaultTheme);

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? DarkTheme : DefaultTheme);
  }, [colorScheme]);

  const screenColors = colorScheme === 'dark' ? CommonStyles.darkTheme : CommonStyles.lightTheme;

  return (
    <NavigationContainer theme={theme} style={CommonStyles.background}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: CommonStyles.container,
          headerTintColor: screenColors.text,
        }}
      >
        <Stack.Screen name="Main">
          {props => <MainScreen {...props} screenColors={screenColors} />}
        </Stack.Screen>

        {/* <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="General" component={GeneralScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="Vehicle Type" component={VehicleTypeScreen} />
        <Stack.Screen name="Speedometer" component={SpeedometerScreen} />
        <Stack.Screen name="Account and Login" component={AccountLoginScreen} />
        <Stack.Screen name="Developer" component={DeveloperScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
