// screens/MainScreen.js
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import propTypes from 'prop-types';
import MainScreenView from './MainScreenView';
import * as SecureStore from 'expo-secure-store';


const initialRegion = {
  latitudeDelta: 0.00522,
  longitudeDelta: 0.00221,
};


export default function MainScreen({ navigation }) {
  MainScreen.propTypes = {
    navigation: propTypes.object,
  };

  const [region, setRegion] = useState(null);
  const [location, setLocation] = useState(null);
  const [shouldRecenter, setShouldRecenter] = useState(true);
  const [speed, setSpeed] = useState(0);
  const [settings, setSettings] = useState(null);


  const calculateSpeed = (location) => {
    const speed = location.coords.speed || 0;
    return speed;
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    let unsubscribe;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const callback = (deviceLocation) => {
        setLocation(deviceLocation);

        if (shouldRecenter) {
          const deviceRegion = {
            latitude: deviceLocation.coords.latitude,
            longitude: deviceLocation.coords.longitude,
            ...initialRegion,
          };

          setRegion(deviceRegion);
        }

        const newSpeed = calculateSpeed(deviceLocation);
        setSpeed(newSpeed);
      };

      unsubscribe = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 0,
        },
        callback
      );
    })();

    return () => {
      if (unsubscribe) {
        unsubscribe.remove();
      }
    };
  }, [shouldRecenter]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      loadSettings();
    });

    return () => {
      focusListener.remove();
    };
  }, []);

  const recenter = () => {
    if (!location) return;
    setShouldRecenter(true);
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
    setShouldRecenter(false);
  };

  const loadSettings = async () => {
    try {
      const value = await SecureStore.getItemAsync('settings');
      if (value !== null) {
        const parsedSettings = JSON.parse(value);
        setSettings(parsedSettings);
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const speedUnit = settings && settings.isSpeedUnitKMH ? 'kph' : 'mph';

  const convertSpeed = (speed, speedUnit) => {
    if (speedUnit === 'kph') {
      return speed * 1.60934;
    }
    if (speedUnit === 'mph') {
      return speed * 1;
    }
  };

  const updatedSpeed = convertSpeed(speed, speedUnit).toFixed(0);
  const locationHeading = location?.coords.heading;

  return (
    <MainScreenView
      region={region}
      location={location}
      onRegionChangeComplete={onRegionChangeComplete}
      recenter={recenter}
      navigation={navigation}
      speed={updatedSpeed}
      speedUnit={speedUnit}
      heading={locationHeading}
    />
  );
}
