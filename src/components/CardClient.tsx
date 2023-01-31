import React from "react";
import { Card, Button, Text } from "@rneui/themed";
import { ClientResponse } from "../interfaces/ClientResponse";
import { StyleSheet, View, Dimensions } from 'react-native';

interface Props {
  client: ClientResponse;
}

const windowWidth = Dimensions.get("window").width;

export const CardClient = ({ client }: Props) => {
  return (
    <Card containerStyle={styles.container}>
      <View style={styles.title}>
        <Card.Title>{client.name}</Card.Title>
        <Card.Title>
          {client.fecha} - {client.hour}
        </Card.Title>
      </View>
      <Card.Divider />
      {client.service.map((e) => (
        <View style={styles.containerService} key={e.id}>
          <Text style={styles.serviceTitle}>{e.service}</Text>
          <Text style={styles.servicePrecio}>{e.precio}$</Text>
        </View>
      ))}
      <Text style={styles.id}>
        {client.email} | {client.id}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width:windowWidth * 0.85,
    alignSelf:'center',
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  id: {
    fontSize: 10,
    color: "gray",
    alignSelf: "flex-end",
  },
  containerService: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 3,
    borderRadius: 10,
    padding: 5,
  },
  serviceTitle: {
    flex: 0.9,
    fontSize: 12,
  },
  servicePrecio: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
