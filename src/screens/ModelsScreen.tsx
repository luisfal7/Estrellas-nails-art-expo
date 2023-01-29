import React from 'react'
import { View, Text, FlatList } from 'react-native';
import { CardModel } from '../components/CardModel';
import { useEstrellas } from '../hooks/useEstrellas';

export const ModelsScreen = () => {

  const {isLoading, clients, models} = useEstrellas()

  return (
    <View>
      <FlatList 
        data={ models }
        renderItem= {({item}) => (
          <CardModel model={ item }/>
          )}
      />
    </View>
  )
}
