import React from 'react';
import SettingsList from './SettingsList';   // new import

export default function SettingsScreen({ navigation }) {
  return (
    <SettingsList navigation={navigation} />
  );
}
