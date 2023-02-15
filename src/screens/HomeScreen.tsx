import React, { useContext } from "react";
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
import { Button } from "@rneui/themed";
import { CardData } from "../components/CardData";
import { CardClient } from "../components/CardClient";
import { useTheme } from "@react-navigation/native";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { clients, lastClient, expense, isLoading } =
    useContext(ApiEstrellaContext); 

  const servicesClient = clients
    .filter((e) => e.id !== lastClient?.id)
    .map(d => d.service)
    .flat()
    .map((e) => parseInt(e?.precio));

  const servicesTotalClient = servicesClient.reduce((pv, cv) => pv + cv, 0);
  const servicesLastClient = lastClient?.service.map(e => parseInt(e.precio)).reduce((pv, cv) => pv + cv, 0);
  const serviceTotalGroos = servicesTotalClient + servicesLastClient
  const expenseCosto = expense.map((e) => parseInt(e.costo))
  const expenseTotal = expenseCosto.reduce((pv, cv) => pv + cv, 0);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={"black"} />
      <View style={styles.containerData}>
        <CardData title="Ingresos Brutos" total={serviceTotalGroos} />
        <CardData title="Ingresos Neto" total={expenseTotal} />
        <CardData title="Gastos Totales" total={expenseTotal} />
      </View>
      <View style={styles.containerBtn}>
        <Button
          radius={"md"}
          size="md"
          type="solid"
          color={colors.primary}
          raised
          icon={{
            name: "add-circle-outline",
            color: "white",
            size: 25,
          }}
          title="Modelo"
          containerStyle={styles.btn}
          onPress={() => navigation.navigate("AddModelScreen")}
        />
        <Button
          radius={"md"}
          size="md"
          type="solid"
          color={colors.primary}
          raised
          icon={{
            name: "add-circle-outline",
            color: "white",
            size: 25,
          }}
          title="Servicio"
          containerStyle={styles.btn}
          onPress={() => navigation.navigate("AddServiceScreen")}
        />
        <Button
          radius={"md"}
          size="md"
          type="solid"
          color={colors.primary}
          raised
          icon={{
            name: "add-circle-outline",
            color: "white",
            size: 25,
          }}
          title="stock"
          containerStyle={styles.btn}
          onPress={() => navigation.navigate("AddStockScreen")}
        />
        <Button
          radius="md"
          size="md"
          type="solid"
          color={colors.primary}
          raised
          icon={{
            name: "add-circle-outline",
            color: "white",
            size: 25,
          }}
          title="Gastos"
          containerStyle={styles.btn}
          onPress={() => navigation.navigate("AddExpenseScreen")}
        />
      </View>
      <View>
        <Text style={styles.title}>Ultima solicitud</Text>
        {isLoading ? (
          <ActivityIndicator color={colors.primary} size={"large"} />
        ) : (
          <View>
            {lastClient ? (
              <Text style={styles.client}>
                <CardClient client={lastClient} />
              </Text>
            ) : (
              <ActivityIndicator color={colors.primary} size={"large"} />
            )}
          </View>
        )}
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator color={colors.primary} size={"large"} />
        ) : (
          <View style={{ height: 300 }}>
            <FlatList
              style={styles.listClient}
              showsVerticalScrollIndicator={false}
              data={listClientsDateNow}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CardClient client={item} />}
              ListHeaderComponent={
                <View
                  style={{
                    ...styles.containerListHeader,
                    backgroundColor: colors.background,
                  }}
                >
                  <Text style={styles.title}>Proximos clientes</Text>
                </View>
              }
              stickyHeaderIndices={[0]}
            />
          </View>
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
    justifyContent: "space-between",
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 5,
  },
  containerBtn: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btn: {
    width: 150,
    margin: 5,
  },
  containerListHeader: {
    height: 20,
    width: "100%",
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
