import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CardModel } from "../components/CardModel";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";

export const ModelsScreen = () => {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();
  const { getModels, models, isLoading } = useContext(ApiEstrellaContext);

  const dimensionWidth = Dimensions.get("window").width;
  const dimensionHeight = Dimensions.get("window").height;

  useEffect(() => {
    getModels();
  }, []);

  return (
    <View style={{ ...styles.container, top: top + 10 }}>
      {isLoading ? (
        <ActivityIndicator
          color={colors.primary}
          size={"large"}
          style={{
            ...styles.indicator,
            top: dimensionHeight * 0.5,
            right: dimensionWidth * 0.5,
          }}
        />
      ) : (
        <View>
          <Text style={styles.title}>Lista de Modelos</Text>
          <FlatList
            data={models}
            renderItem={({ item, index }) => (
              <CardModel model={item} index={index} />
            )}
            showsVerticalScrollIndicator={false}
            style={styles.listModels}
          />
        </View>
      )}
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
    marginBottom: 100,
  },
  indicator: {
    position: "absolute",
  },
});
