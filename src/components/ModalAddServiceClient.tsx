import React, { useContext, useState, useEffect } from "react";
import { View, Modal, StyleSheet, Alert, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card, Button } from "@rneui/themed";
import { Formik } from "formik";
import { useTheme } from "@react-navigation/native";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { ClientResponse } from "../interfaces/ClientResponse";

interface Props {
  client: ClientResponse | null;
  modalVisible: boolean;
  onToggle: () => void;
}

export const ModalAddServiceClient = ({
  client,
  modalVisible,
  onToggle,
}: Props) => {
  const { colors } = useTheme();
  const { modifService, services, getServices } =
    useContext(ApiEstrellaContext);
  
    const [newService, setNewService] = useState('')

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
            <Formik
              initialValues={{
                id: client?.id,
                name: client?.name,
                email: client?.email,
                fecha: client?.fecha,
                service: client?.service,
              }}
              validate={(values) => {
                const expresiones = {
                  nombre: /^[a-zA-ZÀ-ÿ\s\W]{3,100}$/, // Letras, espacios y caracteres no alfa numericos, pueden llevar acentos.
                  precio: /^\d{1,6}$/, // 1 a 6 numeros.
                };

                const errors = {} as ServiceResponse;

                if (!expresiones.nombre.test(values.service))
                  errors.service = "Debe ingresar un servicio valido";

                if (!expresiones.precio.test(values.precio))
                  errors.precio = "Debe ingresar un precio valido";

                return errors;
              }}
              onSubmit={async (values) => {
                try {
                  const { ok, message } = await modifService(values);
                  if (ok) {
                    Alert.alert("Alerta", message);
                    onToggle();
                  } else {
                    Alert.alert("Alerta", message);
                  }
                } catch (error) {
                  Alert.alert("Alerta", "Error en la carga del servicio");
                }
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <Text style={styles.titleForm}>
                    Agregar Servicio a {values.name} - {values.fecha}
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={values.id}
                    editable={false}
                  />
                  <TextInput
                    style={styles.input}
                    value={values.email}
                    editable={false}
                  />
                  {values.service?.map((e) => (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      key={e.id}
                    >
                      <TextInput
                        style={{ ...styles.input, flex: 0.9, height: 80 }}
                        value={e.service}
                        editable={false}
                        multiline={true}
                        numberOfLines={3}
                      />
                      <TextInput
                        style={styles.input}
                        value={e.precio}
                        editable={false}
                      />
                    </View>
                  ))}

                  <View
                    style={{
                      height: 90,
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 10,
                      marginVertical: 8,
                      marginHorizontal: 12,
                      //padding: 10,
                      //flex:1
                    }}
                  >
                    <Picker
                      style={{
                        flex: 1,
                        //flexWrap:'wrap'
                      }}
                      mode="dialog"
                      selectedValue={newService}
                      onValueChange={(value) => {
                        setNewService(value);
                      }}
                      numberOfLines={3}
                      accessibilityLabel={'asdasd'}
                    >
                      <Picker.Item
                        label="Seleccione el servicio nuevo"
                        style={{ fontSize: 14 }}
                      />
                      {services.map((e) => (
                        <Picker.Item
                          key={e.id}
                          label={`${e.service}\nPrecio:${e.precio}`}
                          value={e}
                          style={{ fontSize: 12, width: 250 }}
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
                      onPress={() => handleSubmit()}
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
              )}
            </Formik>
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
  input: {
    height: 40,
    marginVertical: 8,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  titleForm: {
    alignSelf: "center",
    marginVertical: 10,
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
