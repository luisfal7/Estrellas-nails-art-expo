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
    <View style={styles.container}>
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
          <FlatList
            data={models}
            renderItem={({ item, index }) => (
              <CardModel model={item} index={index} />
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View
                style={{
                  ...styles.containerListHeader,
                  backgroundColor: colors.background,
                  borderBottomColor: colors.primary,
                  top: top,
                }}
              >
                <Text style={ styles.title }>Lista de Modelos</Text>
              </View>
            }
            stickyHeaderIndices={[0]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerListHeader: {
    height: 50,
    width: "100%",
    paddingTop: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf:'center'
  },
  indicator: {
    position: "absolute",
  },
});
