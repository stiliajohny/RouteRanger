import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import styles from './MainScreenStyles';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as SecureStore from 'expo-secure-store';
import USERS from './UsersData';

const MARKER_IMAGE = require('./assets/marker.png');

const MainScreenView = ({
  region,
  location,
  onRegionChangeComplete,
  recenter,
  navigation,
  speed,
  speedUnit,
  heading,
}) => {

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

  const adjustedHeading = () => keepMapNorth ? 0 : heading;

  const finalHeading = adjustedHeading();

  const increaseAltitude = () => setAltitude(prevAltitude => prevAltitude + 10);
  const decreaseAltitude = () => setAltitude(prevAltitude => prevAltitude - 10);

  return (
    <View style={styles.mainContainer}>
      {region && (
        <MapView
          style={styles.map}
          onRegionChangeComplete={onRegionChangeComplete}
          mapType={mapViewType}
          camera={{
            center: {
              latitude: region.latitude,
              longitude: region.longitude,
            },
            pitch: mapPitch,
            heading: finalHeading,
            altitude: altitude,
          }}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
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
          {location &&
            USERS.map((user, index) => (
              <Polyline
                key={`polyline-${index}`}
                coordinates={[
                  {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
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
            <Text style={styles.speedText}>{speed}</Text>{' '}
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
        <TouchableOpacity style={styles.controlButton} onPress={recenter}>
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
}

export default MainScreenView;
