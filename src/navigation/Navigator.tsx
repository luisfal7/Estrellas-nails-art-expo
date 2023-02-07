import { createStackNavigator } from '@react-navigation/stack';
import { ModelsScreen } from '../screens/ModelsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AddModelScreen } from '../screens/AddModelScreen';
import { AddServiceScreen } from '../screens/AddServiceScreen';
import { AddExpenseScreen } from '../screens/AddExpenseScreen';
import { AddStockScreen } from '../screens/AddStockScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ModelsScreen" component={ModelsScreen} />
      <Stack.Screen name="AddModelScreen" component={AddModelScreen} />
      <Stack.Screen name="AddServiceScreen" component={AddServiceScreen} />
      <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} />
      <Stack.Screen name="AddStockScreen" component={AddStockScreen} />
    </Stack.Navigator>
  );
}