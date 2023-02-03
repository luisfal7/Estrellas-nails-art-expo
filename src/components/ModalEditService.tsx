import React, { useContext } from "react";
import { View, Modal, StyleSheet, Alert, Text, TextInput } from "react-native";
import { Card, Button } from "@rneui/themed";
import { Formik } from "formik";
import { useTheme } from "@react-navigation/native";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";

interface Props {
  service: ServiceResponse;
  modalVisible: boolean;
  onToggle: () => void;
}

export const ModalEditService = ({
  service,
  modalVisible,
  onToggle,
}: Props) => {
  const { colors } = useTheme();

  const { modifService } = useContext(ApiEstrellaContext);

  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        style={styles.modal}
        //onRequestClose={() => onToggle()}
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
                service: service.service,
                precio: service.precio,
                id: service.id,
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
                  <Text style={styles.titleForm}>Editar Servicio</Text>
                  <TextInput
                    style={styles.input}
                    value={values.id}
                    editable={false}
                  />
                  <TextInput
                    style={{
                      ...styles.input,
                      height: 60,
                      textAlignVertical: "top",
                    }}
                    placeholder="esculpido en poligel"
                    onChangeText={handleChange("service")}
                    onBlur={handleBlur("service")}
                    value={values.service}
                    multiline={true}
                    numberOfLines={2}
                    onEndEditing={() =>
                      console.log(service.service, values.service)
                    }
                    editable={true}
                  />
                  {errors.service && touched.service && (
                    <Text style={styles.errors}>{errors.service}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="2600"
                    onChangeText={handleChange("precio")}
                    onBlur={handleBlur("precio")}
                    value={values.precio}
                    keyboardType="numeric"
                    editable={true}
                  />
                  {errors.precio && touched.precio && (
                    <Text style={styles.errors}>{errors.precio}</Text>
                  )}
                  <View style={styles.containerBtnForm}>
                    <Button
                      radius={"md"}
                      type="solid"
                      color={colors.primary}
                      title="Enviar"
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
