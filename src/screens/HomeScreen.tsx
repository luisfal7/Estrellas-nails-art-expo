import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { Button, Icon } from "@rneui/themed";
import { CardData } from "../components/CardData";
import { CardClient } from "../components/CardClient";
import { useTheme } from "@react-navigation/native";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { clients, getClients, isLoading } = useContext(ApiEstrellaContext);

  const servicesClient = clients
    .map((e) => e.service)
    .flat()
    .map((e) => parseInt(e.precio));

  const servicesTotal = servicesClient.reduce((pv, cv) => pv + cv, 0);

  const listClientsFechaDate = clients.map((e) => ({
    ...e,
    fecha: new Date(
      parseInt(e.fecha.split("/")[2]),
      parseInt(e.fecha.split("/")[1]) - 1,
      parseInt(e.fecha.split("/")[0])
    ).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
  }));

  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const year = fecha.getFullYear();
  const fechaHoy = mes + "/" + dia + "/" + year;

  const listClientsDateNow = listClientsFechaDate.filter(
    (e) => Date.parse(e.fecha) >= Date.parse(fechaHoy)
  );

  useEffect(() => {
    getClients();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={"black"} />
      <View style={styles.containerData}>
        <CardData title="Ingresos Totales" total={servicesTotal} />
        <CardData title="Gastos Totales" total={0} />
      </View>
      <View style={styles.containerBtn}>
        <Button
          radius={"md"}
          type="solid"
          color={colors.primary}
          raised
          icon={{
            name: "add-circle-outline",
            color: "white",
            size: 25,
          }}
          title="Modelo"
          onPress={() => navigation.navigate("AddModelScreen")}
        />
        <Button
          radius={"md"}
          type="solid"
          color={colors.primary}
          raised
          icon={{
            name: "add-circle-outline",
            color: "white",
            size: 25,
          }}
          title="Servicio"
          onPress={() => navigation.navigate("AddServiceScreen")}
        />
      </View>
      <View>
        <Text style={styles.title}>Ultima solicitud</Text>
        {isLoading ? (
          <ActivityIndicator color={colors.primary} size={"large"} />
        ) : (
          <Text style={styles.client}>
            <CardClient
              client={clients.slice(clients.length - 1, clients.length)[0]}
            />
          </Text>
        )}
      </View>
      <View>
        <Text style={styles.title}>Lista de clientes</Text>
        {isLoading ? (
          <ActivityIndicator color={colors.primary} size={"large"} />
        ) : (
          <FlatList
            style={styles.listClient}
            showsVerticalScrollIndicator={false}
            data={listClientsDateNow}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CardClient client={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingVertical: 5,
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 5,
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  title: {
    alignSelf: "center",
  },
  client: {
    padding: 5,
    alignSelf: "center",
  },
  listClient: {},
});
