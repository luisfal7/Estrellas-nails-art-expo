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
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { CardStock } from "../components/CardStock";

export const StockScreen = () => {

  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();
  const { getStock, stock, isLoading } = useContext(ApiEstrellaContext);

  const dimensionWidth = Dimensions.get("window").width;
  const dimensionHeight = Dimensions.get("window").height;

  useEffect(() => {
    getStock();
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
            data={stock}
            renderItem={({ item, index }) => (
              <CardStock item={item} index={index} />
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
                <Text style={ styles.title }>Stock</Text>
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