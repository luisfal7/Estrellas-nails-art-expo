import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, Card, Icon } from "@rneui/themed";
import { ApiEstrellaContext } from "../context/ApiEstrellaContext";
import { ExpenseResponse } from '../interfaces/ExpenseResponse';
import { ModalEditExpense } from "./ModalEditExpense";

interface Props {
    expense: ExpenseResponse;
    index: number;
}

const windowWidth = Dimensions.get("window").width;

export const CardExpense = ({ expense, index }: Props) => {

  const { deleteExpenseItem } = useContext(ApiEstrellaContext);
  const { colors } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const AlertDeleteExpense = () => {
    Alert.alert(
      "¿Desea borrar el item?",
      'Al seleccionar "OK" el item se borrará permanentemente.',
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteExpenseItem(expense) },
      ]
    );
  };

  return (
    <View>
      <Card
        containerStyle={{
          ...styles.containerCard,
          backgroundColor: colors.card,
        }}
      >
        <View style={styles.container}>
          <View style={styles.containerText}>
            <Text style={styles.title}>
              {expense.marca} - {expense.item}
            </Text>
            <Text style={{...styles.precio, fontSize:8}}>{expense.id}</Text>
            <Text style={styles.precio}>Fecha: {expense.fecha}</Text>
            <Text style={styles.precio}>Proveedor: {expense.proveedor}</Text>
            <Text style={styles.precio}>Cant.: {expense.cantidad}</Text>
            <Text style={styles.precio}>Costo: {expense.costo} $</Text>
          </View>
          <View style={styles.containerBtn}>
          <Text style={styles.index}>{index + 1}</Text>
            <Button radius={"md"} type="clear" onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="create-outline" type="ionicon" color="gray" />
            </Button>
            <Button radius={"md"} type="clear" onPress={AlertDeleteExpense}>
              <Icon name="trash-outline" type="ionicon" color="gray" />
            </Button>
          </View>
        </View>
      </Card>
      <View>
        <ModalEditExpense item={expense} modalVisible={modalVisible} onToggle={toggleModal}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  containerText: {
    justifyContent: "space-between",
  },
  title: {
    width: windowWidth * 0.65,
    fontWeight: "bold",
    fontSize: 14,
  },
  precio: {
    justifyContent: "center",
    alignSelf: "flex-start",
    fontSize: 12,
  },
  containerBtn: {
    justifyContent: "space-between",
  },
  index: {
    alignSelf: "center",
    marginBottom: 5,
    color: "gray",
    borderBottomWidth: 1,
    borderColor: "gray",
  },
});
