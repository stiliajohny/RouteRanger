import { StyleSheet } from 'react-native'

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
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
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
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 5,
    elevation: 2
  },
  speedButtonText: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default styles
