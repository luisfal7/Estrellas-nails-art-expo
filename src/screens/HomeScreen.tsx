import React, { useContext, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ApiEstrellaContext } from '../context/ApiEstrellaContext';

export const HomeScreen = () => {

  const navigation = useNavigation();

  const { models, clients, getClients, getServices, services } = useContext(ApiEstrellaContext)

  useEffect(()=>{
    getServices()
  },[])
  
  return (
    <ScrollView>
      <View>
        <Text>
          { JSON.stringify( services, null, 3 ) }
        </Text>
      </View>
    </ScrollView>
  )
}
