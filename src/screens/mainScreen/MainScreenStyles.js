import { StyleSheet } from 'react-native'

const BUTTON_SIZE = 48 // define the button size here
const BUTTON_COLOR = 'white' // define the button color here
const BUTTON_SHADOW_COLOR = 'black' // define the button shadow color here
const BUTTON_TEXT_COLOR = 'red' // define the button text color here
const BUTTON_TEXT_SIZE = 24 // define the button text size here

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
    borderRadius: 50,
    padding: 6,
    width: BUTTON_SIZE, // use the button size constant here
    height: BUTTON_SIZE, // use the button size constant here
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BUTTON_SHADOW_COLOR,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 5,
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
    borderRadius: 50,
    padding: 6,
    width: BUTTON_SIZE, // use the button size constant here
    height: BUTTON_SIZE, // use the button size constant here
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BUTTON_SHADOW_COLOR,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 5,
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
  }
})

export default styles
