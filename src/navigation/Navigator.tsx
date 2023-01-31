import { createStackNavigator } from '@react-navigation/stack';
import { ModelsScreen } from '../screens/ModelsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AddModelScreen } from '../screens/AddModelScreen';
import { AddServiceScreen } from '../screens/AddServiceScreen';

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
    </Stack.Navigator>
  );
}