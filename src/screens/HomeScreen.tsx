import React from 'react'
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEstrellas } from '../hooks/useEstrellas';
import { FlatList } from 'react-native-gesture-handler';
import { CardClient } from '../components/CardClient';
import { CardModel } from '../components/CardModel';

export const HomeScreen = () => {

  const navigation = useNavigation();

  const {isLoading, clients, models} = useEstrellas()
  
  return (
    <View>

    </View>
  )
}
