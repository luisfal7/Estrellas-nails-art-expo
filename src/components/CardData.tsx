import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Card } from '@rneui/themed';

interface Props{
    title: string;
    total: number;
}

export const CardData = ( {title, total}:Props ) => {

    const { colors } = useTheme();

  return (
    <View>
        <Card containerStyle={{...styles.container, backgroundColor: colors.card }}>
            <Text>
                {title}
            </Text>
            <Text style={ styles.total }>
                {total}
            </Text>
        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        //borderWidth:1, 
        borderRadius:10, 
        alignSelf:'center', 
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 4,
    },
    total: {
        paddingTop:5,
        alignSelf:'center',
        fontWeight:'bold'
    }
})
