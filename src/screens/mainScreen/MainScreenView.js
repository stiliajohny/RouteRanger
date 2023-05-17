import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './MainScreenStyles'
import { SPEED_UNITS, convertSpeed } from './speedToggleLogic'
import MapView, { Marker, UrlTile } from 'react-native-maps'

const MARKER_IMAGE = require('./assets/marker.png')
const MARKER_TITLE = 'My Location'

// Define the map coordinates and user marker details
const USERS = [
  {
    name: 'Tokyo',
    latitude: 35.6762,
    longitude: 139.6503
  },
  {
    name: 'London',
    latitude: 51.5072,
    longitude: 0.1276
  },
  {
    name: 'New York',
    latitude: 40.7128,
    longitude: -74.006
  },
  {
    name: 'Sydney',
    latitude: -33.8688,
    longitude: 151.2093
  },
  {
    name: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522
  },
  {
    name: 'Singapore',
    latitude: 1.3521,
    longitude: 103.8198
  },
  {
    name: 'Dubai',
    latitude: 25.2048,
    longitude: 55.2708
  },
  {
    name: 'Hong Kong',
    latitude: 22.3193,
    longitude: 114.1694
  },
  {
    name: 'Shanghai',
    latitude: 31.2304,
    longitude: 121.4737
  },
  {
    name: 'Los Angeles',
    latitude: 34.0522,
    longitude: -118.2437
  },
  {
    name: 'San Francisco',
    latitude: 37.7749,
    longitude: -122.4194
  },
  {
    name: 'Toronto',
    latitude: 43.6532,
    longitude: -79.3832
  },
  {
    name: 'Vancouver',
    latitude: 49.2827,
    longitude: -123.1207
  },
  {
    name: 'Melbourne',
    latitude: -37.8136,
    longitude: 144.9631
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

  useEffect(() => {
    if (location) {
      // Calculate bearing between users and current location
      USERS.forEach((user) => {
        const bearing = calculateBearing(
          location.coords.latitude,
          location.coords.longitude,
          user.latitude,
          user.longitude
        )
        console.log(`Bearing to ${user.name}: ${bearing.toFixed(4)} degrees`)
      })
    }
    console.log('------------------------->')
    console.log('Location changed')
    console.log('------------------------->')
  }, [location])

  // Function to calculate bearing between two coordinates
  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const dLon = lon2 - lon1
    const y = Math.sin(dLon) * Math.cos(lat2)
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)
    const brng = (Math.atan2(y, x) * 180) / Math.PI
    return (brng + 360) % 360
  }

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
        </MapView>
      )}

      {/* Speed button */}
      <View style={styles.speedButtonContainer}>
        <TouchableOpacity style={styles.speedButton} onPress={toggleSpeedUnit}>
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
