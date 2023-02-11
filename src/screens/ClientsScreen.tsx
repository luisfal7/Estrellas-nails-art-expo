import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CardClient } from "../components/CardClient";

export const ClientsScreen = () => {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const { clients, getClients, isLoading } = useContext(ApiEstrellaContext);

  const dimensionWidth = Dimensions.get("window").width;
  const dimensionHeight = Dimensions.get("window").height;

  useEffect(() => {
    getClients();
  }, [clients]);

  return (
    <View style={{ flex: 1 }}>
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
            data={clients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <CardClient client={item} />}
            ListHeaderComponent={
              <View
                style={{
                  ...styles.containerListHeader,
                  backgroundColor: colors.background,
                  borderBottomColor: colors.primary,
                  top: top,
                }}
              >
                <Text style={ styles.title }>Lista de Clientes</Text>
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
  containerListHeader:{
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
