import React, { useContext,useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Card } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props{
    title: string;
    total: number;
}

export const CardData = ( {title, total}:Props ) => {

    const { colors } = useTheme();

    const [hideTotal, setHideTotal] = useState<boolean>(true)

    const changeHideTotal = () => {
        if(hideTotal){
            setHideTotal(false)
        }else{
            setHideTotal(true)
        }
    }

  return (
    <View>
        <Card containerStyle={{...styles.container, backgroundColor: colors.card }}>
            <Text>
                {title}
            </Text>
            <View style={ styles.total }>
                <TouchableOpacity 
                    onPress={changeHideTotal}
                    activeOpacity={0.5}
                >
                    { hideTotal ? <Text style={styles.value}>******</Text> : <Text style={styles.value}>{total} $</Text>}
                </TouchableOpacity>
            </View>
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
    },
    value: {
        fontWeight:'bold'
    }
})
