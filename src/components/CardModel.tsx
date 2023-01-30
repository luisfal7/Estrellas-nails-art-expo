import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Button, Icon } from "@rneui/themed";
import { ModelResponse } from "../interfaces/ModelResponse";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";

interface Props {
  model: ModelResponse;
  index: number;
}

export const CardModel = ({ model, index }: Props) => {

  const {deleteModel} = useContext(ApiEstrellaContext)

  return (
    <View style={ styles.container }>
      <Card.Image
        style={styles.image}
        source={{
          uri: model.model,
        }}
      />
      <View style={styles.containerBtn}>
        <Text style={ styles.index }>{index + 1 }</Text>
        <Button radius={"md"} type="clear" onPress={() => { deleteModel(model) }}>
          <Icon name="trash-outline" type="ionicon" color="gray" />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    borderWidth:1,
    borderColor:'gray',
    borderRadius:10,
    margin:5,
  },
  image:{
    resizeMode: "stretch",
    borderRadius:10,
    width: 250,
    height: 250,
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
