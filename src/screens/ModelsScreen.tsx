import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CardModel } from "../components/CardModel";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";

export const ModelsScreen = () => {
  const { top } = useSafeAreaInsets();
  const { getModels, models } = useContext(ApiEstrellaContext);

  useEffect(() => {
    getModels()
  }, []);

  return (
    <View style={{ ...styles.container, top: top + 10 }}>
      <Text style={styles.title}>Lista de Modelos</Text>
      <FlatList
        data={models}
        renderItem={({ item, index }) => (
          <CardModel model={item} index={index} />
        )}
        style={styles.listModels}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    alignSelf: "center",
    padding: 20,
  },
  listModels: {
    alignSelf: "center",
    marginBottom: 100
  },
});
