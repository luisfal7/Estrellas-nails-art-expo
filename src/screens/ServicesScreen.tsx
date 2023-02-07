import React, { useContext, useEffect } from 'react'
import { View,Text, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardService } from '../components/CardService';
import { ApiEstrellaContext } from '../context/ApiEstrellaContext';
import { useTheme } from "@react-navigation/native";

export const ServicesScreen = () => {

  const { top } = useSafeAreaInsets();

  const { colors } = useTheme();

  const { getServices, services, isLoading } = useContext(ApiEstrellaContext)

  const dimensionWidth = Dimensions.get('window').width
  const dimensionHeight = Dimensions.get('window').height

  useEffect(()=>{
    getServices()
  },[])

  return (
    <View style={{ ...styles.container, top: top + 10 }}>
      {
        isLoading ? 
        (<ActivityIndicator
        color={colors.primary}
        size={"large"}
        style={{
          ...styles.indicator,
          top: dimensionHeight * 0.5,
          right: dimensionWidth * 0.5,
        }}
        />) :
        <View> 
          <Text style={styles.title}>
              Lista de servicios
          </Text>
  
          <FlatList
            data={services}
            renderItem={({ item, index }) => (
              <CardService service={item} index={index} />
              )}
            style={styles.listServices}
          />
        </View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {},
  title: {
    alignSelf: "center",
    padding: 20,
  },
  listServices:{
    alignSelf: "center",
    marginBottom: 100
  },
  indicator: {
    position: "absolute",
  },

});
