import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CardService } from "../components/CardService";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { useTheme } from "@react-navigation/native";

export const ServicesScreen = () => {
  const { top } = useSafeAreaInsets();

  const { colors } = useTheme();

  const { getServices, services, isLoading } = useContext(ApiEstrellaContext);

  const dimensionWidth = Dimensions.get("window").width;
  const dimensionHeight = Dimensions.get("window").height;

  useEffect(() => {
    getServices();
  }, [services]);

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
            data={services}
            renderItem={({ item, index }) => (
              <CardService service={item} index={index} />
            )}
            ListHeaderComponent={
              <View
                style={{
                  ...styles.containerListHeader,
                  backgroundColor: colors.background,
                  borderBottomColor: colors.primary,
                  top: top,
                }}
              >
                <Text style={styles.title}>Lista de Servicios</Text>
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
    alignSelf: "center",
  },
  indicator: {
    position: "absolute",
  },
});
