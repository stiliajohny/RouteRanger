// screens/MainScreen.js
import React, { useRef, useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { Ionicons } from '@expo/vector-icons'
import propTypes from 'prop-types'

const initialRegion = {
  latitudeDelta: 0.00922,
  longitudeDelta: 0.00421
}
const maxZoomDelta = 0.0005
const minZoomDelta = 50

export default function MainScreen ({ navigation }) {
  MainScreen.propTypes = {
    navigation: propTypes.object
  }

  const mapRef = useRef(null)
  const [region, setRegion] = useState(null)
  const [location, setLocation] = useState(null)
  const [shouldRecenter, setShouldRecenter] = useState(true)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  useEffect(() => {
    let unsubscribe;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied')
        return
      }

      const callback = (deviceLocation) => {
        setLocation(deviceLocation)

        if (shouldRecenter) {
          const deviceRegion = {
            latitude: deviceLocation.coords.latitude,
            longitude: deviceLocation.coords.longitude,
            ...initialRegion
          }

          setRegion(deviceRegion)
        }
      }

      unsubscribe = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update location every 1000 ms
          distanceInterval: 0
        },
        callback
      )
    })()

    return () => {
      if (unsubscribe) {
        unsubscribe.remove()
      }
    }
  }, [shouldRecenter])

  const zoomIn = () => {
    if (!region) return
    if (region.latitudeDelta <= maxZoomDelta || region.longitudeDelta <= maxZoomDelta) {
      return
    }

    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2
    }
    mapRef.current.animateToRegion(newRegion, 500)
    setRegion(newRegion)
  }

  const zoomOut = () => {
    if (!region) return
    if (region.latitudeDelta >= minZoomDelta || region.longitudeDelta >= minZoomDelta) {
      return
    }

    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2
    }
    mapRef.current.animateToRegion(newRegion, 500)
    setRegion(newRegion)
  }

  const recenter = () => {
    if (!location) return
    setShouldRecenter(true)
  }

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion)
    setShouldRecenter(false)
  }

  return (
        <View style={styles.container}>
            {region && (
                <MapView
                    style={styles.map}
                    ref={mapRef}
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
                            <Image source={require('../assets/marker.png')} style={{ width: 32, height: 32 }} />
                        </Marker>
                    )}
                </MapView>
            )}
            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton} onPress={zoomIn}>
                    <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={zoomOut}>
                    <Ionicons name="remove" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={recenter}>
                    <Ionicons name="navigate" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  controlButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2
  }
})
