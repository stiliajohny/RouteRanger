import React from 'react';
import SettingsView from './SettingsView';  // new import

export default function SettingsList({ navigation }) {
        const items = [
                { name: 'General', icon: 'ios-settings', nav: 'General' },
                { name: 'Racing Details', icon: 'ios-speedometer', nav: 'Racing Details' },
                { name: 'Map Display', icon: 'ios-map', nav: 'Map Display' },
                { name: 'Navigation', icon: 'ios-navigate', nav: 'Navigation' },
                { name: 'Vehicle Type', icon: 'ios-car', nav: 'Vehicle Type' },
                { name: 'Speedometer', icon: 'ios-speedometer', nav: 'Speedometer' },
                { name: 'Account and Login', icon: 'ios-person', nav: 'Account and Login' },
                { name: 'Developer', icon: 'ios-code', nav: 'Developer' },
        ];

        return (
                <SettingsView items={items} onItemPress={navigation.navigate} />
        );
}
