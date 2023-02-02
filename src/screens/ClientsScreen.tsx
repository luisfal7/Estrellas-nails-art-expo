import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { CardClient } from "../components/CardClient";

export const ClientsScreen = () => {

  const { colors } = useTheme();
  const { clients, getClients, isLoading } = useContext(ApiEstrellaContext);

  useEffect(() => {
    getClients();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator color={colors.primary} size={"large"} />
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
});
