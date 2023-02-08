import React, { useContext, useState } from "react";
import { useTheme } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Card, Button } from "@rneui/themed";
import mime from "mime";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { StockResponse } from "../interfaces/StockResponse";
import uploadImageDB from "../helpers/uploadImageDB";

interface Props {
  uri: string;
  type: string | null;
  name: string | undefined;
}

export const AddStockScreen = () => {
  const { colors } = useTheme();
  const { addItemStock } = useContext(ApiEstrellaContext);

  const [selectedImage, setSelectedImage] = useState<Props | null>(null);

  const imageSource = selectedImage !== null && selectedImage;

  const pickImageLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert(
        "¡Te has negado a permitir que esta aplicación acceda a tu galeria!, active los permisos."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      let localUri = result.assets[0].uri;
      let type = mime.getType(result.assets[0].uri);
      let filename = localUri.split("/").pop();

      const data = {
        uri: localUri,
        type: type,
        name: filename,
      };

      setSelectedImage(data);
    } else {
      alert("No seleccionó ninguna imagen.");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card containerStyle={{ ...styles.card, backgroundColor: colors.card }}>
          <Formik
            initialValues={{
              cantidad: "",
              marca: "",
              codigo: "",
              categoria: "",
              subcategoria: "",
              contenidoNeto: "",
              image: imageSource,
            }}
            validate={(values) => {
              const expresiones = {
                nombre: /^[a-zA-ZÀ-ÿ\s\W]{3,100}$/, // Letras, espacios y caracteres no alfa numericos, pueden llevar acentos.
                numero: /^\d{1,6}$/, // 1 a 6 numeros.
                contenidoNeto: /^[\d]{1,6}[a-zA-Z\s]{2,4}$/, // 1 a 6 numeros y 4 letras.
              };

              const errors = {} as StockResponse;

              if (!expresiones.numero.test(values.cantidad))
                errors.cantidad = "Debe ingresar una cantidad valida";

              if (!expresiones.nombre.test(values.marca))
                errors.marca = "Debe ingresar una marca valida";

              if (!expresiones.numero.test(values.codigo))
                errors.codigo = "Debe ingresar un codigo valido";

              if (!expresiones.nombre.test(values.categoria))
                errors.categoria = "Debe ingresar una categoria valida";

              if (!expresiones.nombre.test(values.subcategoria))
                errors.subcategoria = "Debe ingresar una subcategoria valida";

              if (!expresiones.contenidoNeto.test(values.contenidoNeto))
                errors.contenidoNeto = "Debe ingresar un contenido neto valido";

              if (!imageSource)
                errors.image = "Debe ingresar una imagen valida";

              return errors;
            }}
            onSubmit={async ({cantidad, categoria, codigo, contenidoNeto, image, marca, subcategoria}, { resetForm }) => {
                           
              try {
                const resp = await uploadImageDB(image);
                const { ok } = await addItemStock({cantidad, categoria, codigo, contenidoNeto, image: resp, marca, subcategoria});
                if (ok) {
                  Alert.alert("Alerta", "El Item se ha cargado correctamente");
                  setSelectedImage(null);
                  resetForm();
                } else {
                  Alert.alert("Alerta", "¡El item ya existente!");
                }
              } catch (error) {
                Alert.alert("Alerta", "Error en la carga del item");
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
                <Text style={styles.title}>Agregar item a stock</Text>
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
                  placeholder="marca: Navi"
                  onChangeText={handleChange("marca")}
                  onBlur={handleBlur("marca")}
                  value={values.marca}
                />
                {errors.marca && touched.marca && (
                  <Text style={styles.errors}>{errors.marca}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="codigo: 002"
                  onChangeText={handleChange("codigo")}
                  onBlur={handleBlur("codigo")}
                  value={values.codigo}
                  keyboardType="numeric"
                />
                {errors.codigo && touched.codigo && (
                  <Text style={styles.errors}>{errors.codigo}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="categoria: gel polish"
                  onChangeText={handleChange("categoria")}
                  onBlur={handleBlur("categoria")}
                  value={values.categoria}
                />
                {errors.categoria && touched.categoria && (
                  <Text style={styles.errors}>{errors.categoria}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="subcategoria: neon"
                  onChangeText={handleChange("subcategoria")}
                  onBlur={handleBlur("subcategoria")}
                  value={values.subcategoria}
                />
                {errors.subcategoria && touched.subcategoria && (
                  <Text style={styles.errors}>{errors.subcategoria}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="contenido neto: 10 ml"
                  onChangeText={handleChange("contenidoNeto")}
                  onBlur={handleBlur("contenidoNeto")}
                  value={values.contenidoNeto}
                />
                {errors.contenidoNeto && touched.contenidoNeto && (
                  <Text style={styles.errors}>{errors.contenidoNeto}</Text>
                )}
                <View
                  style={{
                    ...styles.containerImg,
                    backgroundColor: colors.card,
                  }}
                >
                  {!imageSource ? (
                    <Text style={styles.textImg}>
                      Seleccione una imagen o tome una foto
                    </Text>
                  ) : (
                    <Image style={styles.img} source={values.image = imageSource} />
                  )}
                </View>
                {errors.image && touched.image && (
                  <Text style={styles.errorsImg}>{errors.image}</Text>
                )}

                <Button
                  radius={"md"}
                  type="solid"
                  color={colors.primary}
                  title="galeria"
                  containerStyle={styles.btnImg}
                  onPress={pickImageLibrary}
                />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom:10
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
  btnImg: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  btn: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  errors: {
    fontSize: 10,
    color: "red",
    top: -10,
    left: 20,
  },

  containerImg: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: "dotted",
    width: 150,
    height: 150,
    padding: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  textImg: {
    fontSize: 10,
    color:'gray',
    opacity:0.8,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  },

  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  errorsImg:{
    fontSize: 10,
    color: "red",
    top: -10,
    marginTop:3,
    alignSelf:'center'
  }

});
