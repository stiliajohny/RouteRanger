// GeneralScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
        container: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
        },
        text: {
                flex: 1,
        },
        toggleContainer: {
                flexDirection: 'row',
                alignItems: 'center',
        },
        iconContainer: {
                flexDirection: 'row',
                alignItems: 'center',
        },
        icon: {
                marginHorizontal: 4,
        },
});

export default styles;
