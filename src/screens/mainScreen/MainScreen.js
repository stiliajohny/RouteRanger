// screens/MainScreen.js
import React, { useRef, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import * as Location from 'expo-location'
import propTypes from 'prop-types'
import MainScreenView from './MainScreenView'

const initialRegion = {
  latitudeDelta: 0.00922,
  longitudeDelta: 0.00421
}
const maxZoomDelta = 0.05
const minZoomDelta = 50

export default function MainScreen({ navigation }) {
  MainScreen.propTypes = {
    navigation: propTypes.object
  }

  const mapRef = useRef(null)
  const [region, setRegion] = useState(null)
  const [location, setLocation] = useState(null)
  const [shouldRecenter, setShouldRecenter] = useState(true)
  const [speed, setSpeed] = useState(0)

  const calculateSpeed = (location) => {
    // Calculate the speed based on the location
    // For example:
    const speed = location.coords.speed || 0
    return speed
  }

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

        const newSpeed = calculateSpeed(deviceLocation)
        setSpeed(newSpeed)
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

    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 500)
    }

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
    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 500)
    }
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

  const heading = location ? location.coords.heading : 0

  return (
    <MainScreenView
      region={region}
      location={location}
      onRegionChangeComplete={onRegionChangeComplete}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      recenter={recenter}
      navigation={navigation}
      speed={speed}
      heading={heading}
    />
  )
}
