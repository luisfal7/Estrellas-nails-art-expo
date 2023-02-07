import React, { useContext } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Card, Button, Icon } from "@rneui/themed";
import { ModelResponse } from "../interfaces/ModelResponse";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { useTheme } from '@react-navigation/native';

interface Props {
  model: ModelResponse;
  index: number;
}

export const CardModel = ({ model, index }: Props) => {

  const {deleteModel} = useContext(ApiEstrellaContext)

  const { colors } = useTheme();

  const AlertDeleteModel = () => {
    Alert.alert('¿Desea borrar el modelo?', 'Al seleccionar "OK" el modelo se borrará permanentemente.', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteModel(model)},
  ])}

  return (
    <Card containerStyle={{ ...styles.card, backgroundColor: colors.card }}>
      <View style={styles.container}>
        <Card.Image
          style={styles.image}
          source={{
            uri: model.model,
          }}
        />
        <View style={styles.containerBtn}>
          <Text style={ styles.index }>{index + 1 }</Text>
          <Button radius={"md"} type="clear" onPress={ AlertDeleteModel }>
            <Icon name="trash-outline" type="ionicon" color="gray" />
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius:10,
    margin:10,
    padding:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  container: {
    flexDirection:'row',
    justifyContent: "space-between",
  },
  image:{
    resizeMode: "stretch",
    borderRadius:10,
    width: 180,
    height: 180,
    paddingVertical: 5
  },
  containerBtn: {
    marginVertical: 5,
    marginHorizontal:5,
    justifyContent: "space-between",
  },
  index:{
    alignSelf:'center',
    color: 'gray',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: 'gray'
  }
});
