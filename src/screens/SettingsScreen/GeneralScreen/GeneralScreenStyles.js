import { StyleSheet } from 'react-native';

export default StyleSheet.create({
        screenContainer: {
                flex: 1,
                backgroundColor: '#f5f5f5',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
        },
        card: {
                width: '90%',
                backgroundColor: '#fff',
                padding: 10, // Adjust the value here
                marginVertical: 5, // Adjust the value here
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
        },
        cardText: {
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
        },
        iconContainer: {
                flexDirection: 'row',
        },
        icon: {
                marginRight: 10,
        },
        colorOptionsContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
        },
        colorOption: {
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#ccc',
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
        },
        checkmarkIcon: {
                alignSelf: 'center',
        },

});
