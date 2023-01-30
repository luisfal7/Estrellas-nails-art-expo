import React, { useContext, useEffect } from 'react'
import { View,Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardService } from '../components/CardService';
import { ApiEstrellaContext } from '../context/ApiEstrellaContext';

export const ServicesScreen = () => {

  const { top } = useSafeAreaInsets();

  const { getServices, services } = useContext(ApiEstrellaContext)

  useEffect(()=>{
    getServices()
  },[])

  return (
    <View style={{ ...styles.container, top: top + 10 }}>
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
  }

});
