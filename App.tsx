import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from './src/navigation/BottomTabs';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs/>
    </NavigationContainer>
  );
}