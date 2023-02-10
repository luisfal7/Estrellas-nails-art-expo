import React, { useContext, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Card, Button } from "@rneui/themed";
import { Formik } from "formik";
import mime from "mime";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@react-navigation/native";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { StockResponse } from "../interfaces/StockResponse";
import uploadImageDB from "../helpers/uploadImageDB";

interface Props {
  item: StockResponse;
  modalVisible: boolean;
  onToggle: () => void;
}

interface ImageProps {
  uri: string;
  type?: string | null;
  name?: string | undefined;
}

export const ModalEditStock = ({ item, modalVisible, onToggle }: Props) => {
  const { colors } = useTheme();

  const { modifItemStock } = useContext(ApiEstrellaContext);

  const imageItem = {
    uri: item.image,
  };

  const [selectedImage, setSelectedImage] = useState<ImageProps>(imageItem);

  const imageSource = selectedImage === imageItem ? imageItem : selectedImage;

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
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        style={styles.modal}
        //onRequestClose={() => onToggle()}
      >
        <View style={styles.centeredView}>
          <ScrollView>
            <Card
              containerStyle={{
                ...styles.card,
                backgroundColor: colors.card,
              }}
            >
              <Formik
                initialValues={{
                  id: item.id,
                  cantidad: item.cantidad,
                  marca: item.marca,
                  codigo: item.codigo,
                  categoria: item.categoria,
                  subcategoria: item.subcategoria,
                  contenidoNeto: item.contenidoNeto,
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
                    errors.subcategoria =
                      "Debe ingresar una subcategoria valida";

                  if (!expresiones.contenidoNeto.test(values.contenidoNeto))
                    errors.contenidoNeto =
                      "Debe ingresar un contenido neto valido";

                  if (!imageSource)
                    errors.image = "Debe ingresar una imagen valida";

                  return errors;
                }}
                onSubmit={async (
                  {
                    id,
                    cantidad,
                    categoria,
                    codigo,
                    contenidoNeto,
                    image,
                    marca,
                    subcategoria,
                  }
                ) => {
                  try {
                    const { ok, message } = await modifItemStock({
                      id,
                      cantidad,
                      categoria,
                      codigo,
                      contenidoNeto,
                      image: image.uri !== imageItem.uri ? await uploadImageDB(image) : imageItem.uri,
                      marca,
                      subcategoria,
                    });
                    if (ok) {
                      Alert.alert("Alerta", message);
                      onToggle();
                    } else {
                      Alert.alert("Alerta", message);
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
                    <Text style={styles.titleForm}>Agregar item a stock</Text>
                    <TextInput
                      style={styles.input}
                      value={values.id}
                      editable={false}
                    />
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
                      {!selectedImage ? (
                        <Text style={styles.textImg}>
                          Seleccione una imagen
                        </Text>
                      ) : (
                        <Image
                          style={styles.img}
                          source={(values.image = imageSource)}
                        />
                      )}
                    </View>
                    {errors.image && touched.image && (
                      <Text style={styles.errorsImg}>{errors.image}</Text>
                    )}
                    <View style={styles.containerBtnForm}>
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
          </ScrollView>
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
  btnImg: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  btn: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  containerBtnForm: {
    marginTop: 5,
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
    color: "gray",
    opacity: 0.8,
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
  errorsImg: {
    fontSize: 10,
    color: "red",
    top: -10,
    marginTop: 3,
    alignSelf: "center",
  },
});
