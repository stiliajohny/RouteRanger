import { StyleSheet } from 'react-native';

export default StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: '#f5f5f5',
                alignItems: 'center',
        },
        option: {
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                margin: 10,
                padding: 20,
                borderRadius: 20,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.35,
                shadowRadius: 4.84,
                elevation: 5,
        },
        icon: {
                marginRight: 20,
        },
        text: {
                fontSize: 18,
        },
});
