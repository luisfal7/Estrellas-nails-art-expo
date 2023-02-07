import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { CardClient } from "../components/CardClient";

export const ClientsScreen = () => {

  const { colors } = useTheme();
  const { clients, getClients, isLoading } = useContext(ApiEstrellaContext);

  const dimensionWidth = Dimensions.get('window').width
  const dimensionHeight = Dimensions.get('window').height

  useEffect(() => {
    getClients();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator color={colors.primary} size={"large"} style={{...styles.indicator, top: dimensionHeight * 0.5, right: dimensionWidth * 0.5}}/>
      ) : (
        <View>
          <Text style={styles.title}>Lista de Clientes</Text>
          <FlatList
            data={clients}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CardClient client={item} />}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    alignSelf: "center",
    padding: 20,
  },
  indicator: {
    position: 'absolute'
  }
});
