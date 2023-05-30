import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as SecureStore from 'expo-secure-store';
import propTypes from 'prop-types';
import * as Location from 'expo-location';
import USERS from './UsersData';

const MARKER_IMAGE = require('./assets/motorbike_red_choper.png');

const BUTTON_SIZE = 48;
const SHADOW_OPACITY = 0.3;
const BUTTON_TEXT_SIZE = 24;
const BORDER_RADIUS = 50;
const SHADOW_RADIUS = 10;

const initialMapRegion = {
  latitudeDelta: 0.00522,
  longitudeDelta: 0.00221,
};



const MainScreen = ({ navigation, screenColors }) => {
  MainScreen.propTypes = {
    navigation: propTypes.object,
  };

  const { background, text, shadowColor, buttonColor } = screenColors;
  console.log('MainScreen: ', screenColors);


  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    controlsContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    controlButton: {
      backgroundColor: buttonColor,
      borderRadius: BORDER_RADIUS,
      padding: 6,
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: shadowColor,
      shadowOpacity: SHADOW_OPACITY,
      shadowOffset: { width: 3, height: 5 },
      shadowRadius: SHADOW_RADIUS,
      elevation: 2,
    },
    speedButtonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
    },
    speedButton: {
      backgroundColor: buttonColor,
      color: text,
      borderRadius: BORDER_RADIUS,
      padding: 6,
      width: BUTTON_SIZE * 2,
      height: BUTTON_SIZE,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: shadowColor,
      shadowOpacity: SHADOW_OPACITY,
      shadowOffset: { width: 3, height: 5 },
      shadowRadius: SHADOW_RADIUS,
      elevation: 2,
    },
    speedButtonText: {
      fontSize: BUTTON_TEXT_SIZE,
      textAlign: 'center',
    },
    buttonsText: {
      color: text,
      fontSize: BUTTON_TEXT_SIZE,
    },
    markerImage: {
      width: 28,
      height: 100
    },
    speedText: {
      fontSize: 24,
      textAlign: 'center',
      justifyContent: 'center',
      color: text,
    },
    speedUnitText: {
      fontSize: 12,
      textAlign: 'center',
      justifyContent: 'center',
      color: text,
    },
  });


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

  const fetchSettings = async () => {
    try {
      const value = await SecureStore.getItemAsync('settings');
      if (value !== null) {
        const parsedSettings = JSON.parse(value);
        setMapPitch(parsedSettings.defaultMapPitch);
        setPolylineColor(parsedSettings.defaultPolylineColor);
        setPolylineThickness(parsedSettings.defaultPolylineThickness);
        setMapViewType(parsedSettings.mapView);
        setKeepMapNorth(parsedSettings.keepMapNorth);
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSettings();
      return () => { };
    }, [])
  );

  const [altitude, setAltitude] = useState(100);
  const [mapPitch, setMapPitch] = useState(70);
  const [polylineColor, setPolylineColor] = useState('#000');
  const [polylineThickness, setPolylineThickness] = useState(0.5);
  const [mapViewType, setMapViewType] = useState('standard');
  const [keepMapNorth, setKeepMapNorth] = useState(0);

  const adjustedHeading = () => (keepMapNorth ? 0 : locationHeading);

  const finalHeading = adjustedHeading();

  const increaseAltitude = () => setAltitude((prevAltitude) => prevAltitude - 50);
  const decreaseAltitude = () => setAltitude((prevAltitude) => prevAltitude + 50);

  return (
    <View style={styles.mainContainer}>
      {mapRegion && (
        <MapView
          style={styles.map}
          onRegionChangeComplete={handleRegionChangeComplete}
          mapType={mapViewType}
          camera={{
            center: {
              latitude: mapRegion.latitude,
              longitude: mapRegion.longitude,
            },
            pitch: mapPitch,
            heading: finalHeading,
            altitude: altitude,
          }}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
            >
              <Image source={MARKER_IMAGE} style={styles.markerImage} />
            </Marker>
          )}
          {USERS.map((user, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: user.latitude,
                longitude: user.longitude,
              }}
              title={user.name}
            />
          ))}
          {currentLocation &&
            USERS.map((user, index) => (
              <Polyline
                key={`polyline-${index}`}
                coordinates={[
                  {
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                  },
                  {
                    latitude: user.latitude,
                    longitude: user.longitude,
                  },
                ]}
                strokeColor={polylineColor}
                strokeWidth={polylineThickness}
              />
            ))}
        </MapView>
      )}
      <View style={styles.speedButtonContainer}>
        <TouchableOpacity style={styles.speedButton}>
          <Text>
            <Text style={styles.speedText}>{displaySpeed}</Text>{' '}
            <Text style={styles.speedUnitText}>{speedUnit}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={increaseAltitude}>
          <Ionicons name="add" style={styles.buttonsText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={decreaseAltitude}>
          <Ionicons name="remove" style={styles.buttonsText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={recenterMap}>
          <Ionicons name="navigate" style={styles.buttonsText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" style={styles.buttonsText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;

// import React from 'react';
// import { View, Text } from 'react-native';

// const MainScreen = ({ screenColors }) => {
//   const { background, text } = screenColors;

//   return (
//     <View style={[{ flex: 1 }, background]}>
//       <Text style={[{ color: text }]}>Main Screen</Text>
//     </View>
//   );
// };

// export default MainScreen;
