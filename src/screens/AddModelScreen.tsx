import React, { useState, useContext } from "react";
import mime from "mime";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import uploadImageDB from "../helpers/uploadImageDB";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";

export const AddModelScreen = () => {
  const { colors } = useTheme();

  const { addModel } = useContext(ApiEstrellaContext);

  const [selectedImage, setSelectedImage] = useState<any>(null);

  const imageSource = selectedImage !== null && { uri: selectedImage.uri };

  const pickImageLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
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

  const pickImageCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
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
      alert("No se tomo ninguna imagen.");
    }
  };

  const updateImage = async () => {
    const resp = await uploadImageDB(selectedImage);
    setSelectedImage(null);
    console.log(resp);
    const { ok, message } = await addModel(resp);
    if (ok) {
      Alert.alert("Alerta", message);
    } else {
      Alert.alert("Alerta", message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.containerImg, backgroundColor: colors.card }}>
        {!imageSource ? (
          <Text style={styles.textImg}>
            Seleccione una imagen o tome una foto
          </Text>
        ) : (
          <Image style={styles.img} source={imageSource} />
        )}
      </View>
      <View style={styles.containerBtn}>
        <Button
          radius={"md"}
          type="solid"
          color={colors.primary}
          raised
          title="Galeria"
          onPress={pickImageLibrary}
          containerStyle={styles.btn}
        />
        <Button
          radius={"md"}
          type="solid"
          color={colors.primary}
          raised
          title="Camara"
          onPress={pickImageCamera}
          containerStyle={styles.btn}
        />
        <Button
          radius={"md"}
          type="solid"
          color={colors.primary}
          raised
          title="Guardar"
          onPress={updateImage}
          containerStyle={{ ...styles.btn, marginTop: 40 }}
        />
        <Button
          radius={"md"}
          type="solid"
          color={colors.notification}
          raised
          title="Borrar"
          onPress={() => setSelectedImage(null)}
          containerStyle={styles.btn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    padding: 15,
    paddingVertical: 5,
    justifyContent: "space-around",
  },
  containerImg: {
    borderWidth: 2,
    borderRadius: 20,
    borderStyle: "dotted",
    width: 350,
    height: 350,
    padding: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  textImg: {
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
  containerBtn: {},
  btn: {
    marginVertical: 5,
  },
});
