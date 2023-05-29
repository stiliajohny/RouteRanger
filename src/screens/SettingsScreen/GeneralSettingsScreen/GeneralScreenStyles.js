import { StyleSheet } from 'react-native';

export default StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: '#f5f5f5',
                padding: 10,
        },
        scrollContainer: {
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
        },
        card: {
                width: '90%',
                backgroundColor: '#fff',
                padding: 10,
                marginVertical: 10,
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 2.84,
                elevation: 2,
        },
        cardText: {
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
        },
        sliderContainer: {
                flexDirection: 'row',
                alignItems: 'center',
        },
        slider: {
                flex: 1,
                marginHorizontal: 10,
        },
        sliderValue: {
                fontSize: 16,
                fontWeight: 'bold',
        },
        colorOptionsContainer: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
        },
        colorOption: {
                width: 35,
                height: 35,
                borderRadius: 15,
                marginRight: 10,
        },
        checkmarkIcon: {
                position: 'absolute',
                top: 6,
                right: 6,
        },
        cardSubText: {
                marginTop: 5,
                fontSize: 12,
                color: '#777',
        },
        speedUnitContainer: {
                flexDirection: 'row',
                alignItems: 'center',
        },
        iconContainer: {
                flexDirection: 'row', // Added for map type icons
        },
        icon: {
                marginRight: 10, // Added for map type icons
        },
        iconItemContent: {
                alignItems: 'center',
        },

});
