import React from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardModel } from '../components/CardModel';
import { useEstrellas } from '../hooks/useEstrellas';

export const ModelsScreen = () => {

  const {isLoading, models} = useEstrellas()
  const{ top } = useSafeAreaInsets()

  return (
    <View style={{...styles.container, top: top + 10 }}>
      <Text style={ styles.title }>Lista de Modelos</Text>
      {
        isLoading ? 
        <ActivityIndicator size="large" />
        : 
        (
          <FlatList 
            data={ models }
            renderItem= {({item}) => (
              <CardModel model={ item }/>
              )}
              style={ styles.ListModels }
          />
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  title: {
    alignSelf: 'center',
    padding: 20
  },
  ListModels: {
    alignSelf: 'center'
  }
})
