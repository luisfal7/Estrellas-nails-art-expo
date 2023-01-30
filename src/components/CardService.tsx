import React,{ useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { ApiEstrellaContext } from '../context/ApiEstrellaContext';

interface Props {
  service: ServiceResponse;
  index: number;
}

const windowWidth = Dimensions.get("window").width;

export const CardService = ({ service, index }: Props) => {

  const {deleteService} = useContext(ApiEstrellaContext)

  return (
    <View style={styles.containerCard}>
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Text style={styles.title}>
            {index + 1} - {service.service}
          </Text>
          <Text style={styles.precio}>Precio actual: {service.precio}$</Text>
        </View>
        <View style={styles.containerBtn}>
          <Button radius={"md"} type="clear" onPress={() => {}}>
            <Icon name="create-outline" type="ionicon" color="gray" />
          </Button>
          <Button radius={"md"} type="clear" onPress={() => {deleteService(service)}}>
            <Icon name="trash-outline" type="ionicon" color="gray" />
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    margin: 5,
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
  precio: {
    justifyContent: "center",
    alignSelf: "flex-start",
    fontSize: 12,
  },
  containerBtn: {
    justifyContent: "space-between",
  },
});