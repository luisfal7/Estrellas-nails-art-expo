import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Card } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  title: string;
  total?: number;
  current?: number;
}

export const CardData = ({ title, total, current }: Props) => {
  const { colors } = useTheme();

  const [hideTotal, setHideTotal] = useState<boolean>(true);

  const changeHideTotal = () => {
    if (hideTotal) {
      setHideTotal(false);
    } else {
      setHideTotal(true);
    }
  };

  return (
    <View>
      <Card
        containerStyle={{ ...styles.container, backgroundColor: colors.card }}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.total}>
          <TouchableOpacity onPress={changeHideTotal} activeOpacity={0.5}>
            {hideTotal ? (
              <Text style={styles.value}>*********</Text>
            ) : (
              <View>
                {total && <Text style={styles.value}>{total} $</Text>}
                {current && (
                  <Text style={styles.valueCurrent}>{current} $</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    //borderWidth:1,
    borderRadius: 10,
    alignSelf: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 12,
  },
  total: {
    paddingTop: 5,
    alignSelf: "flex-end",
    fontWeight: "bold",
  },
  value: {
    alignSelf: "flex-end",
    fontWeight: "bold",
    fontSize: 10,
  },
  valueCurrent: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
