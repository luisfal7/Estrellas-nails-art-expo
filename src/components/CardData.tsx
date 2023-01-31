import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { ApiEstrellaContext } from '../context/ApiEstrellaContext';

interface Props{
    title: string;
    total: number;
}

export const CardData = ( {title, total}:Props ) => {

  return (
    <View>
        <View style={ styles.container }>
            <Text>
                {title}
            </Text>
            <Text style={ styles.total }>
                {total}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        borderWidth:1, 
        borderRadius:10, 
        alignSelf:'center', 
        padding:10
    },
    total: {
        paddingTop:5,
        alignSelf:'center',
        fontWeight:'bold'
    }
})
