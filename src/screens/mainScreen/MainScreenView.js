/* eslint-disable react/prop-types */
import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import styles from './MainScreenStyles'

export default function MainScreenView ({
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
              // title="My Location" //TODO make it a variable that will set from settings

            >
              <Image
                source={require('./assets/marker.png')}
                style={styles.markerImage}
              />
            </Marker>
          )}
        </MapView>
      )}

      {/* Speed button */}
      <View style={styles.speedButtonContainer}>
        <TouchableOpacity style={styles.speedButton}>
          <Text style={styles.buttonsText}>
            {speed.toFixed(0)}
          </Text>
        </TouchableOpacity>
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
