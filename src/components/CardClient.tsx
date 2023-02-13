import React, { useContext, useState } from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Card, Button, Text, Icon } from "@rneui/themed";
import { ClientResponse } from "../interfaces/ClientResponse";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { ModalAddServiceClient } from "./ModalAddServiceClient";

interface Props {
  client: ClientResponse;
}

const windowWidth = Dimensions.get("window").width;

export const CardClient = ({ client }: Props) => {
  const { colors } = useTheme();

  const { deleteClient } = useContext(ApiEstrellaContext);

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const AlertDeleteClient = () => {
    Alert.alert(
      "¿Desea borrar el cliente?",
      'Al seleccionar "OK" el cliente se borrará permanentemente.',
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteClient(client) },
      ]
    );
  };

  return (
    <View>
      <Card
        containerStyle={{ ...styles.container, backgroundColor: colors.card }}
      >
        <View style={styles.title}>
          <Card.Title>{client?.name}</Card.Title>
          <Card.Title>
            {client?.fecha} - {client?.hour}
          </Card.Title>
        </View>
        <Card.Divider />
        {client?.service.map((e) => (
          <View style={styles.containerService} key={e?.id}>
            <Text style={styles.serviceTitle}>{e?.service}</Text>
            <Text style={styles.servicePrecio}>{e?.precio}$</Text>
          </View>
        ))}
        <View style={styles.footer}>
          <View>
            <Text style={styles.id}>{client?.email} |</Text>
            <Text style={styles.id}>{client?.id} |</Text>
          </View>
          <Button
            radius={"md"}
            type="clear"
            size="sm"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Icon name="create-outline" type="ionicon" color="gray" size={18} />
          </Button>
          <Button
            radius={"md"}
            type="clear"
            size="sm"
            onPress={AlertDeleteClient}
          >
            <Icon name="trash-outline" type="ionicon" color="gray" size={18} />
          </Button>
        </View>
      </Card>
      <View>
        <ModalAddServiceClient
          client={client}
          modalVisible={modalVisible}
          onToggle={toggleModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.85,
    alignSelf: "center",
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
  titleBtn: {
    flexDirection: "row",
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
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
