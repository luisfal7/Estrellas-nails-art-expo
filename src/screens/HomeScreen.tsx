import React from 'react'
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {

  const navigation = useNavigation();

  return (
    <View>
        <Text>
            Home screen
        </Text>
        <Button 
          title='ir details'
          onPress={() => navigation.navigate('DetailsScreen')}
        />
    </View>
  )
}
