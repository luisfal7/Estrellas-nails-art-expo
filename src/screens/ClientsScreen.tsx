import React, { useContext, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native';
import { CardClient } from '../components/CardClient';
import { ApiEstrellaContext } from '../context/ApiEstrellaContext';

export const ClientsScreen = () => {

  const {clients, getClients} = useContext(ApiEstrellaContext)

  useEffect(()=>{
    getClients()
  },[])

  return (
    <View style={{ flex:1 }}>
      <FlatList 
        data={ clients }
        keyExtractor={((item) => item.id)}
        renderItem= {({item}) => (
          <CardClient client={ item }/>
          )}
      />
  </View>
  )
}
