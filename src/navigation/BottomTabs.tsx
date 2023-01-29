import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import { ModelsScreen } from "../screens/ModelsScreen";
import { Navigator } from "./Navigator";
import { ClientsScreen } from "../screens/ClientsScreen";
import { ServicesScreen } from '../screens/ServicesScreen';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: () => <Icon name="home-outline" color="gray" size={25} />,
        }}
        name="Inicio"
        component={Navigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon name="color-palette-outline" color="gray" size={25} />
          ),
        }}
        name="Modelos"
        component={ModelsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon name="people-outline" color="gray" size={25} />
          ),
        }}
        name="Clientes"
        component={ClientsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon name="reader-outline" color="gray" size={25} />
          ),
        }}
        name="Servicios"
        component={ServicesScreen}
      />
    </Tab.Navigator>
  );
};
