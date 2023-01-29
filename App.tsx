import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from './src/navigation/BottomTabs';
import { ApiEstrellaProvider } from './src/context/ApiEstrellaContext';

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
      <NavigationContainer>
        <BottomTabs/>
      </NavigationContainer>
    </AppStateApi>

  );
}