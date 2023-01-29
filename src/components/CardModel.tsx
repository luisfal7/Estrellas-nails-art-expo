import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Icon } from "@rneui/themed";
import { ModelResponse } from "../interfaces/ModelResponse";

interface Props {
  model: ModelResponse;
}

export const CardModel = ({ model }: Props) => {
  return (
    <View>
      <Card
        containerStyle={styles.containerCard}
      >
        <Card.Image
          style={{ resizeMode: 'contain', borderTopLeftRadius:10, borderTopRightRadius:10 }}
          source={{
            uri: model.model,
          }}
        />
        <View style={styles.containerBtn}>
            <Button radius={"md"} type="clear">
                <Icon name="trash-outline" type='ionicon' color="gray" />
            </Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
    containerCard:{
        borderRadius: 10,
        width: 200,
        padding:0,
        //margin:0
    },
    containerBtn:{
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-end'
    }
});
