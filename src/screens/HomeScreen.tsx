import React, { useContext } from 'react'
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ApiEstrellaContext } from '../context/ApiEstrellaContext';

export const HomeScreen = () => {

  const navigation = useNavigation();

  const { models } = useContext(ApiEstrellaContext)
  
  return (
    <View>
      <Text>
        { JSON.stringify( models, null, 3 ) }
      </Text>
    </View>
  )
}
