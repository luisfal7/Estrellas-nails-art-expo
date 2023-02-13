import React, { useContext, useState, useEffect } from "react";
import { View, Modal, StyleSheet, Alert, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card, Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { ClientResponse, Service } from "../interfaces/ClientResponse";
import { ServiceResponse } from "../interfaces/ServiceResponse";

interface Props {
  client: ClientResponse;
  modalVisible: boolean;
  onToggle: () => void;
}

export const ModalAddServiceClient = ({
  client,
  modalVisible,
  onToggle,
}: Props) => {
  const { colors } = useTheme();
  const { addServiceClient, services, getServices } =
    useContext(ApiEstrellaContext);

  const [newService, setNewService] = useState<Service>();

  const servicesList = services
    .map((e) => (client.service.some((d) => d.id === e.id) ? true : e))
    .filter((e) => e !== true) as ServiceResponse[];

  const alertAddService = async () => {
    Alert.alert(
      "¿Desea borrar el item?",
      'Al seleccionar "OK" el item se agregará permanentemente.',
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => addService() },
      ]
    );
  };

  const addService = async () => {
    try {
      const { ok, message } = await addServiceClient(
        client,
        newService as Service
      );
      if (ok) {
        Alert.alert("Alerta", message);
        onToggle();
      } else {
        Alert.alert("Alerta", message);
      }
    } catch (error) {
      Alert.alert("Alerta", "Error en la carga del servicio");
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        style={styles.modal}
      >
        <View style={styles.centeredView}>
          <Card
            containerStyle={{
              ...styles.card,
              backgroundColor: colors.card,
            }}
          >
            <View>
              <Text style={styles.titleModal}>
                Agregar Servicio a {client?.name} - {client?.fecha}
              </Text>
              <Text style={styles.text}>{client?.id}</Text>
              <Text style={styles.text}>{client?.email}</Text>
              <Text style={styles.titleService}>servicios solicitados</Text>
              {client?.service.map((e) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  key={e.id}
                >
                  <Text style={styles.text}>{e.service}</Text>
                  <Text style={styles.text}>{e.precio}</Text>
                </View>
              ))}
              <Text style={styles.titleService}>servicio a agregar</Text>
              <View style={styles.containerPicker}>
                <Picker
                  mode="dialog"
                  selectedValue={newService}
                  onValueChange={(value) => {
                    setNewService(value);
                  }}
                  numberOfLines={4}
                >
                  <Picker.Item
                    label="Seleccione el servicio nuevo"
                    style={{ fontSize: 14 }}
                  />
                  {servicesList.map((e) => (
                    <Picker.Item
                      key={e.id}
                      label={`${e.service}\nPrecio:${e.precio}`}
                      value={e}
                      style={{ fontSize: 14 }}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.containerBtnForm}>
                <Button
                  radius={"md"}
                  type="solid"
                  color={colors.primary}
                  title="Agregar"
                  containerStyle={styles.btn}
                  onPress={() => {
                    alertAddService();
                  }}
                />
                <Button
                  radius={"md"}
                  type="solid"
                  color={colors.notification}
                  title="Cancelar"
                  containerStyle={styles.btn}
                  onPress={() => onToggle()}
                />
              </View>
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    marginVertical: 5,
    marginHorizontal: 12,
    opacity: 0.5,
  },
  titleService: {
    alignSelf: "center",
    marginVertical: 5,
    fontWeight: "bold",
  },
  titleModal: {
    alignSelf: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  containerPicker: {
    alignContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  card: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },
  btn: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  containerBtnForm: {
    marginTop: 20,
  },
  errors: {
    fontSize: 10,
    color: "red",
    top: -10,
    left: 20,
  },
});
