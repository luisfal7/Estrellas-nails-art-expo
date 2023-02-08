import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Card, Icon } from "@rneui/themed";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { StockResponse } from "../interfaces/StockResponse";

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
          <View style={styles.containerImgText}>
            <Card.Image
              style={styles.image}
              source={{
                uri: item.image,
              }}
            />

            <View style={styles.containerItem}>
              <Text style={styles.cantidad}>Cant: {item.cantidad}</Text>
              <Text style={styles.title}>
                {item.marca} {item.codigo} - {item.contenidoNeto}
              </Text>
              <Text style={styles.categoria}>
                {item.categoria} | {item.subcategoria}
              </Text>
            </View>
          </View>

          <View style={styles.containerBtn}>
            <Text style={styles.index}>{index + 1}</Text>
            <Button radius={"md"} type="clear" onPress={()=>{}}>
              <Icon name="create-outline" type="ionicon" color="gray" />
            </Button>
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
    borderRadius: 10,
    margin: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  image: {
    resizeMode: "stretch",
    borderRadius: 10,
    width: 120,
    height: 120,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerImgText: {
    flexDirection: "row",
  },
  containerItem: {
    paddingLeft: 10,
  },
  cantidad: {
    opacity: 0.5,
    fontSize: 12,
  },
  title: {
    fontWeight: "bold",
  },
  categoria: {
    opacity: 0.5,
    fontSize: 12,
  },
  containerBtn: {
    justifyContent: "space-between",
  },
  index: {
    alignSelf: "center",
    marginBottom: 5,
    color: "gray",
    borderBottomWidth: 1,
    borderColor: "gray",
  },
});
