import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './MainScreenStyles';
import MapView, { Marker, Polyline } from 'react-native-maps';
import USERS from './UsersData'; // new import

const MARKER_IMAGE = require('./assets/marker.png');

export default function MainScreenView({
  region,
  location,
  onRegionChangeComplete,
  recenter,
  navigation,
  speed,
  speedUnit,
  heading,
}) {
  // TODO add settings for default altitude
  const [altitude, setAltitude] = useState(100); // Default altitude value of 100 T

  // Function to handle zoomIn button press
  const handleZoomIn = () => {
    setAltitude((prevAltitude) => prevAltitude + 10); // Increase altitude by 10
  };

  // Function to handle zoomOut button press
  const handleZoomOut = () => {
    setAltitude((prevAltitude) => prevAltitude - 10); // Decrease altitude by 10
  };

  return (
    <View style={styles.mainContainer}>
      {region && (
        <MapView
          style={styles.map}
          onRegionChangeComplete={onRegionChangeComplete}
          mapType="standard"
          camera={{
            center: {
              latitude: region.latitude,
              longitude: region.longitude,
            },
            // TODO add settings for default pitch
            pitch: 70,
            heading: heading,
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
          {/* Render user markers */}
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
          {/* Render polylines */}
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
                // TODO add settings for default polyline color
                strokeColor="#FF0000"
                //  TODO add settings for default polyline width
                strokeWidth={2}
              />
            ))}
        </MapView>
      )}

      {/* Speed button */}
      <View style={styles.speedButtonContainer}>
        <TouchableOpacity style={styles.speedButton}>
          <Text>
            <Text style={styles.speedText}>{speed}</Text>{' '}
            <Text style={styles.speedUnitText}>{speedUnit}</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Control buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
          <Ionicons name="add" style={styles.buttonsText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
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
