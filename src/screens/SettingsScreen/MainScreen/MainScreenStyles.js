import { StyleSheet } from 'react-native'

const BUTTON_SIZE = 48 // define the button size here
const BUTTON_COLOR = 'white' // define the button color here
const BUTTON_SHADOW_COLOR = 'black' // define the button shadow color here
const SHADOW_OPACITY = 0.3 // define the button shadow opacity here
const BUTTON_TEXT_COLOR = 'black' // define the button text color here
const BUTTON_TEXT_SIZE = 24 // define the button text size here
const BORDER_RADIUS = 50 // define the border radius here
const SHADOW_RADIUS = 10 // define the shadow radius here

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  map: {
    flex: 1
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  controlButton: {
    backgroundColor: BUTTON_COLOR,
    borderRadius: BORDER_RADIUS,
    padding: 6,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BUTTON_SHADOW_COLOR,
    shadowOpacity: SHADOW_OPACITY,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: SHADOW_RADIUS,
    elevation: 2
  },
  speedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  speedButton: {
    backgroundColor: BUTTON_COLOR,
    color: BUTTON_TEXT_COLOR,
    borderRadius: BORDER_RADIUS,
    padding: 6,
    width: BUTTON_SIZE * 2,
    height: BUTTON_SIZE,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BUTTON_SHADOW_COLOR,
    shadowOpacity: SHADOW_OPACITY,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: SHADOW_RADIUS,
    elevation: 2
  },
  speedButtonText: {
    fontSize: BUTTON_TEXT_SIZE,
    textAlign: 'center'
  },
  buttonsText: {
    color: BUTTON_TEXT_COLOR,
    fontSize: BUTTON_TEXT_SIZE

  },
  markerImage: {
    width: 28,
    height: 28
  },
  speedText: {
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center'

  },
  speedUnitText: {
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center'

  }

})

export default styles
