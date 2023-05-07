/* eslint-disable react/prop-types */
import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import styles from './MainScreenStyles'
import SpeedToggleButton from './SpeedToggleButton' // Import the new component

const MARKER_IMAGE = require('./assets/marker.png')
const MARKER_TITLE = 'My Location'

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
              title={MARKER_TITLE}
            >
              <Image
                source={MARKER_IMAGE}
                style={styles.markerImage}
              />
            </Marker>
          )}
        </MapView>
      )}

      {/* Speed button */}
      {/* Speed button */}
      <View style={styles.speedButtonContainer}>
        <SpeedToggleButton
          style={styles.speedButton}
          speed={speed}
        />
      </View>
      {/* Control buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={zoomIn}>
          <Ionicons name="add" style={styles.buttonsText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={zoomOut}>
          <Ionicons name="remove" style={styles.buttonsText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={recenter}>
          <Ionicons name="navigate" style={styles.buttonsText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" style={styles.buttonsText} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
