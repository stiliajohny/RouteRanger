import { StyleSheet } from 'react-native';

export default StyleSheet.create({
        screenContainer: {
                flex: 1,
                backgroundColor: '#f5f5f5',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
        },
        card: {
                width: '90%',
                backgroundColor: '#fff',
                padding: 20,
                marginVertical: 10,
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
});
