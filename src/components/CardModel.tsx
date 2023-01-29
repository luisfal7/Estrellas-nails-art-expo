import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Icon } from "@rneui/themed";
import { ModelResponse } from "../interfaces/ModelResponse";

interface Props {
  model: ModelResponse;
}

export const CardModel = ({ model }: Props) => {

  return (
    <View style={ styles.container }>
      <Card.Image
        style={styles.image}
        source={{
          uri: model.model,
        }}
      />
      <View style={styles.containerBtn}>
        <Button radius={"md"} type="clear">
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
    width: 200,
    height: 200,
    paddingVertical: 5
  },
  containerBtn: {
    marginVertical: 5,
    marginHorizontal:5,
    justifyContent: "flex-end",
  },
});
