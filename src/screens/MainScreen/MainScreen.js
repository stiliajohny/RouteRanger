import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import propTypes from 'prop-types';
import MainScreenView from './MainScreenView';
import * as SecureStore from 'expo-secure-store';

const initialMapRegion = {
  latitudeDelta: 0.00522,
  longitudeDelta: 0.00221,
};

const MainScreen = ({ navigation }) => {
  MainScreen.propTypes = {
    navigation: propTypes.object,
  };

  const [mapRegion, setMapRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [autoRecenter, setAutoRecenter] = useState(true);
  const [speed, setSpeed] = useState(0);
  const [userSettings, setUserSettings] = useState(null);

  const computeSpeed = (location) => {
    const currentSpeed = location.coords.speed || 0;
    return currentSpeed;
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    let locationSubscription;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const locationCallback = (deviceLocation) => {
        setCurrentLocation(deviceLocation);

        if (autoRecenter) {
          const deviceRegion = {
            latitude: deviceLocation.coords.latitude,
            longitude: deviceLocation.coords.longitude,
            ...initialMapRegion,
          };

          setMapRegion(deviceRegion);
        }

        const newSpeed = computeSpeed(deviceLocation);
        setSpeed(newSpeed);
      };

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 0,
        },
        locationCallback
      );
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [autoRecenter]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', loadUserSettings);

    return () => {
      focusListener.remove();
    };
  }, []);

  const recenterMap = () => {
    if (!currentLocation) return;
    setAutoRecenter(true);
  };

  const handleRegionChangeComplete = (newRegion) => {
    setMapRegion(newRegion);
    setAutoRecenter(false);
  };

  const loadUserSettings = async () => {
    try {
      const value = await SecureStore.getItemAsync('settings');
      if (value !== null) {
        const parsedSettings = JSON.parse(value);
        setUserSettings(parsedSettings);
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const speedUnit = userSettings && userSettings.isSpeedUnitKMH ? 'kph' : 'mph';

  const convertSpeed = (currentSpeed, speedUnit) => {
    return speedUnit === 'kph' ? currentSpeed * 1.60934 : currentSpeed;
  };

  const displaySpeed = convertSpeed(speed, speedUnit).toFixed(0);
  const locationHeading = currentLocation?.coords.heading;

  return (
    <MainScreenView
      region={mapRegion}
      location={currentLocation}
      onRegionChangeComplete={handleRegionChangeComplete}
      recenter={recenterMap}
      navigation={navigation}
      speed={displaySpeed}
      speedUnit={speedUnit}
      heading={locationHeading}
    />
  );
};

export default MainScreen;
