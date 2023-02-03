import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Card, Icon } from "@rneui/themed";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { ModalEditService } from "./ModalEditService";

interface Props {
  service: ServiceResponse;
  index: number;
}

const windowWidth = Dimensions.get("window").width;

export const CardService = ({ service, index }: Props) => {
  const { deleteService } = useContext(ApiEstrellaContext);

const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const AlertDeleteService = () => {
    Alert.alert(
      "¿Desea borrar el servicio?",
      'Al seleccionar "OK" el servicio se borrará permanentemente.',
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteService(service) },
      ]
    );
  };

  return (
    <View>
      <Card
        containerStyle={{ ...styles.containerCard, backgroundColor: colors.card }}
      >
        <View style={styles.container}>
          <View style={styles.containerText}>
            <Text style={styles.title}>
              {index + 1} - {service.service}
            </Text>
            <Text style={styles.precio}>Precio actual: {service.precio}$</Text>
          </View>
          <View style={styles.containerBtn}>
            <Button
              radius={"md"}
              type="clear"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name="create-outline" type="ionicon" color="gray" />
            </Button>
            <Button radius={"md"} type="clear" onPress={AlertDeleteService}>
              <Icon name="trash-outline" type="ionicon" color="gray" />
            </Button>
          </View>
        </View>
      </Card>
      <View>
        <ModalEditService service={service} modalVisible={modalVisible} onToggle={toggleModal}/>
      </View>
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
  precio: {
    justifyContent: "center",
    alignSelf: "flex-start",
    fontSize: 12,
  },
  containerBtn: {
    justifyContent: "space-between",
  },

});
