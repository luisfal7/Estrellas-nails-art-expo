import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { BottomTabs } from './src/navigation/BottomTabs';
import { ApiEstrellaProvider } from './src/context/ApiEstrellaContext';

const lightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: '#F5A826',
    background: '#EBE7E4',
    card: '#F7ECDE',
    text: 'rgb(28, 28, 30)',
    border: 'gray',
    notification: 'rgb(255, 69, 58)',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

const AppStateApi = ({children}: any) => {
  return(
    <ApiEstrellaProvider>
      {children}
    </ApiEstrellaProvider>
  )
}

export default function App() {
  return (
    <AppStateApi>
      <NavigationContainer theme={lightTheme}>
        <BottomTabs/>
      </NavigationContainer>
    </AppStateApi>

  );
}