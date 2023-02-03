import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Card, Button } from "@rneui/themed";
import { Formik } from "formik";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { ServiceResponse } from '../interfaces/ServiceResponse';


export const AddServiceScreen = () => {
  const { colors } = useTheme();
  const { addService } = useContext(ApiEstrellaContext);

  return (
    <View style={styles.container}>
      <Card containerStyle={{ ...styles.card, backgroundColor: colors.card }}>
        <Formik
          initialValues={{ service: "", precio: ""}}
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
          onSubmit={async (values, { resetForm }) => {
            try {
              const { ok } = await addService(values);
              if (ok) {
                Alert.alert(
                  "Alerta",
                  "El servicio se ha cargado correctamente"
                );
                resetForm();
              } else {
                Alert.alert(
                  "Alerta",
                  "¡El servicio ya existente!"
                );
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
              <Text style={styles.title}>Agregar Servicio</Text>
              <TextInput
                style={styles.input}
                placeholder="manicura rusa"
                onChangeText={handleChange("service")}
                onBlur={handleBlur("service")}
                value={values.service}
              />
              {errors.service && touched.service && (
                <Text style={styles.errors}>{errors.service}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="3000"
                onChangeText={handleChange("precio")}
                onBlur={handleBlur("precio")}
                value={values.precio}
                keyboardType="numeric"
              />
              {errors.precio && touched.precio && <Text style={styles.errors}>{errors.precio}</Text>}
              <Button
                radius={"md"}
                type="solid"
                color={colors.primary}
                title="Enviar"
                containerStyle={styles.btn}
                onPress={() => handleSubmit()}
              />
            </View>
          )}
        </Formik>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  input: {
    height: 40,
    marginVertical: 12,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  title: {
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
    marginVertical: 30,
    marginHorizontal: 10,
  },
  errors: {
    fontSize:10,
    color:'red',
    top:-10,
    left:20
  }
});
