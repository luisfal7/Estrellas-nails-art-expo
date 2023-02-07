import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import { ModelsScreen } from "../screens/ModelsScreen";
import { Navigator } from "./Navigator";
import { ClientsScreen } from "../screens/ClientsScreen";
import { ServicesScreen } from "../screens/ServicesScreen";
import { useTheme } from "@react-navigation/native";
import { StockScreen } from "../screens/StockScreen";
import { ExpenseScreen } from "../screens/ExpenseScreen";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.border,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home-outline"
              color={focused ? colors.primary : colors.border}
              size={focused ? 25 : 20}
            />
          ),
        }}
        name="Inicio"
        component={Navigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="color-palette-outline"
              color={focused ? colors.primary : colors.border}
              size={focused ? 25 : 20}
            />
          ),
        }}
        name="Modelos"
        component={ModelsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="people-outline"
              color={focused ? colors.primary : colors.border}
              size={focused ? 25 : 20}
            />
          ),
        }}
        name="Clientes"
        component={ClientsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="reader-outline"
              color={focused ? colors.primary : colors.border}
              size={focused ? 25 : 20}
            />
          ),
        }}
        name="Servicios"
        component={ServicesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="briefcase-outline"
              color={focused ? colors.primary : colors.border}
              size={focused ? 25 : 20}
            />
          ),
        }}
        name="Stock"
        component={StockScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="cash-outline"
              color={focused ? colors.primary : colors.border}
              size={focused ? 25 : 20}
            />
          ),
        }}
        name="Gastos"
        component={ExpenseScreen}
      />
    </Tab.Navigator>
  );
};
