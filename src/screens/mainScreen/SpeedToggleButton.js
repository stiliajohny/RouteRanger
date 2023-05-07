// SpeedToggleButton.js
import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './MainScreenStyles'

const SPEED_UNITS = ['mph', 'kph', 'm/s']

const convertSpeed = (speed, unit) => {
        switch (unit) {
                case 'mph':
                        return speed * 2.23694
                case 'kph':
                        return speed * 3.6
                case 'm/s':
                        return speed
                default:
                        return speed
        }
}

export default function SpeedToggleButton({ speed, style }) {
        const [speedUnitIndex, setSpeedUnitIndex] = useState(0)

        const toggleSpeedUnit = () => {
                setSpeedUnitIndex((speedUnitIndex + 1) % SPEED_UNITS.length)
        }

        const currentSpeedUnit = SPEED_UNITS[speedUnitIndex]
        const displayedSpeed = convertSpeed(speed, currentSpeedUnit)

        return (
                <TouchableOpacity style={style} onPress={toggleSpeedUnit}>
                        <Text>
                                <Text style={styles.speedText}>{displayedSpeed.toFixed(0)}</Text>
                                {' '}
                                <Text style={styles.speedUnitText}>{currentSpeedUnit}</Text>
                        </Text>
                </TouchableOpacity>
        )
}
