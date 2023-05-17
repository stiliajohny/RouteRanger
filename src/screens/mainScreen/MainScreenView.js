import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './MainScreenStyles'
import { SPEED_UNITS, convertSpeed } from './speedToggleLogic'
import MapView, { Marker, UrlTile, Polyline } from 'react-native-maps'

const MARKER_IMAGE = require('./assets/marker.png')

// Define the map coordinates and user marker details
const USERS = [
  {
    name: 'Chile',
    latitude: -33.4489,
    longitude: -70.6693
  }
  // Add more users here if needed
]

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
                longitude: user.longitude
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
                    longitude: location.coords.longitude
                  },
                  {
                    latitude: user.latitude,
                    longitude: user.longitude
                  }
                ]}
                strokeColor="#FF0000"
                strokeWidth={2}
              />
            ))}
        </MapView>
      )}

      {/* Speed button */}
      <View style={styles.speedButtonContainer}>
        <TouchableOpacity style={styles.speedButton} onPress={toggleSpeedUnit}>
          <Text>
            <Text style={styles.speedText}>{displayedSpeed.toFixed(0)}</Text>{' '}
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
