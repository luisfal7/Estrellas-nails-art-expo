import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Card, Icon } from "@rneui/themed";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { StockResponse } from '../interfaces/StockResponse';

interface Props {
    item: StockResponse;
    index: number;
}

const windowWidth = Dimensions.get("window").width;

export const CardStock = ({ item, index }: Props) => {

  const { deleteStockItem } = useContext(ApiEstrellaContext);

  const { colors } = useTheme();

  const AlertDeleteStock = () => {
    Alert.alert(
      "¿Desea borrar el item?",
      'Al seleccionar "OK" el item se borrará permanentemente.',
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteStockItem(item) },
      ]
    );
  };

  return (
    <View>
      <Card
        containerStyle={{
          ...styles.containerCard,
          backgroundColor: colors.card,
        }}
      >
        <View style={styles.container}>
          <View style={styles.containerText}>
            <Text style={styles.title}>
              {index + 1} - {item.marca} | {item.codigo} | {item.contenidoNeto}
            </Text>
            <Text style={styles.categoria}>{item.categoria} | {item.subcategoria}</Text>
          </View>
          <View style={styles.containerBtn}>
            <Button radius={"md"} type="clear" onPress={AlertDeleteStock}>
              <Icon name="trash-outline" type="ionicon" color="gray" />
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  containerText: {
    justifyContent: "space-between",
  },
  title: {
    width: windowWidth * 0.65,
    fontWeight: "bold",
    fontSize: 12,
  },
  categoria: {
    justifyContent: "center",
    alignSelf: "flex-start",
    fontSize: 12,
  },
  containerBtn: {
    justifyContent: "space-between",
  },
});
