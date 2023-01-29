import React from 'react'
import { View, Text, FlatList } from 'react-native';
import { CardClient } from '../components/CardClient';
import { useEstrellas } from '../hooks/useEstrellas';

export const ClientsScreen = () => {

  const {isLoading, clients, models} = useEstrellas()

  return (
    <View style={{ flex:1 }}>
      <FlatList 
        data={ clients }
        renderItem= {({item}) => (
          <CardClient client={ item }/>
          )}
      />
  </View>
  )
}
