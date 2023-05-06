import { StyleSheet } from 'react-native'

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
  },
  speedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 120,
    height: 120,
    borderRadius: 600,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 9,
    elevation: 2
  },
  speedButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  speedButtonText: {
    fontSize: 19,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default styles
