import { StyleSheet } from 'react-native';

export default StyleSheet.create({
        container: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: 10,
        },
        cardText: {
                fontSize: 18,
                fontWeight: 'bold',
        },
        icon: {
                width: 50,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ccc',
        },
        iconActive: {
                width: 50,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
        },
        scrollContainer: {
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
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
        iconItemContent: {
                alignItems: 'center',
        },
        iconText: {
                color: 'white',
                fontSize: 12,
        },
        iconContent: {
                alignItems: 'center',
                justifyContent: 'center',
        },
        textContainer: {
                flex: 1,
        },
        toggle: {
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 15,
                overflow: 'hidden',
                width: 100,
        },
        toggleActive: {
                width: 50,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
        },
        toggleInactive: {
                width: 50,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ccc',
        },
        lineStyle: {
                borderWidth: 1,
                borderColor: 'black',
                margin: 10,
                width: '100%',
        },
        valueContainer: {
                width: 40,
                alignItems: 'center',
        },
        toggleContainer: {
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 15,
                overflow: 'hidden',
                alignItems: 'center', // to center items vertically
        },
});
