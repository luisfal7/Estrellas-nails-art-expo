import React, { useContext } from "react";
import { View, Modal, StyleSheet, Alert, Text, TextInput } from "react-native";
import { Card, Button } from "@rneui/themed";
import { Formik } from "formik";
import { useTheme } from "@react-navigation/native";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { ExpenseResponse } from "../interfaces/ExpenseResponse";

interface Props {
  item: ExpenseResponse;
  modalVisible: boolean;
  onToggle: () => void;
}

export const ModalEditExpense = ({ item, modalVisible, onToggle }: Props) => {
  const { colors } = useTheme();
  const { modifExpense } = useContext(ApiEstrellaContext);

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
                id: item.id,
                fecha: item.fecha,
                cantidad: item.cantidad,
                item: item.item,
                marca: item.marca,
                modelo: item.modelo,
                proveedor: item.proveedor,
                costo: item.costo,
              }}
              validate={(values) => {
                const expresiones = {
                  fecha:
                    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/, //fecha
                  numero: /^\d{1,6}$/, // 1 a 6 numeros.
                  letrasNumeros: /^[a-zA-ZÀ-ÿ\s\W\d]{3,100}$/, // Letras, espacios y caracteres no alfa numericos, pueden llevar acentos y numeros.
                  nombre: /^[a-zA-ZÀ-ÿ\s\W]{3,100}$/, // Letras, espacios y caracteres no alfa numericos, pueden llevar acentos.
                };

                const errors = {} as ExpenseResponse;

                if (!expresiones.fecha.test(values.fecha))
                  errors.fecha = "Debe ingresar una fecha valida";

                if (!expresiones.numero.test(values.cantidad))
                  errors.cantidad = "Debe ingresar una cantidad valida";

                if (!expresiones.letrasNumeros.test(values.item))
                  errors.item = "Debe ingresar un item valido";

                if (!expresiones.nombre.test(values.marca))
                  errors.marca = "Debe ingresar una marca valida";

                if (!expresiones.letrasNumeros.test(values.modelo))
                  errors.modelo = "Debe ingresar un modelo valido";

                if (!expresiones.nombre.test(values.proveedor))
                  errors.proveedor = "Debe ingresar un proveedor valido";

                if (!expresiones.numero.test(values.costo))
                  errors.costo = "Debe ingresar un costo valido";

                return errors;
              }}
              onSubmit={async (values) => {
                try {
                  const { ok, message } = await modifExpense(values);
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
                  <Text style={styles.titleForm}>Agregar item de gasto</Text>
                  <TextInput
                    style={styles.input}
                    value={values.id}
                    editable={false}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="fecha: 09/02/2023"
                    onChangeText={handleChange("fecha")}
                    onBlur={handleBlur("fecha")}
                    value={values.fecha}
                  />
                  {errors.fecha && touched.fecha && (
                    <Text style={styles.errors}>{errors.fecha}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="cantidad: 1"
                    onChangeText={handleChange("cantidad")}
                    onBlur={handleBlur("cantidad")}
                    value={values.cantidad}
                    keyboardType="numeric"
                  />
                  {errors.cantidad && touched.cantidad && (
                    <Text style={styles.errors}>{errors.cantidad}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="item: esmalte semipermanente 15 ml"
                    onChangeText={handleChange("item")}
                    onBlur={handleBlur("item")}
                    value={values.item}
                  />
                  {errors.item && touched.item && (
                    <Text style={styles.errors}>{errors.item}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="marca: Meline"
                    onChangeText={handleChange("marca")}
                    onBlur={handleBlur("marca")}
                    value={values.marca}
                  />
                  {errors.marca && touched.marca && (
                    <Text style={styles.errors}>{errors.marca}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="modelo: 610"
                    onChangeText={handleChange("modelo")}
                    onBlur={handleBlur("modelo")}
                    value={values.modelo}
                  />
                  {errors.modelo && touched.modelo && (
                    <Text style={styles.errors}>{errors.modelo}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="proveedor: La Manola"
                    onChangeText={handleChange("proveedor")}
                    onBlur={handleBlur("proveedor")}
                    value={values.proveedor}
                  />
                  {errors.proveedor && touched.proveedor && (
                    <Text style={styles.errors}>{errors.proveedor}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="costo: 1700"
                    onChangeText={handleChange("costo")}
                    onBlur={handleBlur("costo")}
                    value={values.costo}
                    keyboardType="numeric"
                  />
                  {errors.costo && touched.costo && (
                    <Text style={styles.errors}>{errors.costo}</Text>
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
