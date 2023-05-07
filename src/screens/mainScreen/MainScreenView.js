/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
// import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import styles from './MainScreenStyles'
import { SPEED_UNITS, convertSpeed } from './speedToggleLogic' // Import the speed toggle logic
import MapView, { Marker, UrlTile } from 'react-native-maps'

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
  speed
}) {
  const [speedUnitIndex, setSpeedUnitIndex] = useState(0)

  const toggleSpeedUnit = () => {
    setSpeedUnitIndex((speedUnitIndex + 1) % SPEED_UNITS.length)
  }

  const currentSpeedUnit = SPEED_UNITS[speedUnitIndex]
  const displayedSpeed = convertSpeed(speed, currentSpeedUnit)

  return (
    <View style={styles.mainContainer}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          <UrlTile
            urlTemplate="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
            zIndex={1}
          />
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }}
              title={MARKER_TITLE}
            >
              <Image source={MARKER_IMAGE} style={styles.markerImage} />
            </Marker>
          )}
        </MapView>
      )}

      {/* Speed button */}
      <View style={styles.speedButtonContainer}>
        <TouchableOpacity
          style={styles.speedButton}
          onPress={toggleSpeedUnit}
        >
          <Text>
            <Text style={styles.speedText}>{displayedSpeed.toFixed(0)}</Text>
            {' '}
            <Text style={styles.speedUnitText}>{currentSpeedUnit}</Text>
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
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" style={styles.buttonsText} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
