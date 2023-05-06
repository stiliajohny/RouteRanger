/* eslint-disable react/prop-types */
import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import styles from './MainScreenStyles'

export default function MainScreenView({
  region,
  location,
  onRegionChangeComplete,
  zoomIn,
  zoomOut,
  recenter,
  navigation,
  speed,
  speedUnit
}) {
  return (
    <View style={styles.mainContainer}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }}
              title="My Location"
            >
              <Image
                source={require('./assets/marker.png')}
                style={{ width: 28, height: 28 }}
              />
            </Marker>
          )}
        </MapView>
      )}

      {/* Speed button */}
      <View style={styles.speedButtonContainer}>
        <TouchableOpacity style={styles.speedButton}>
          <Text style={styles.speedButtonText}>
            {speed.toFixed(1)} {'\n'} {speedUnit}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Control buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={zoomIn}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={zoomOut}>
          <Ionicons name="remove" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={recenter}>
          <Ionicons name="navigate" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
