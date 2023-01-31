import { createStackNavigator } from '@react-navigation/stack';
import { ModelsScreen } from '../screens/ModelsScreen';
import { HomeScreen } from '../screens/HomeScreen';

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
    </Stack.Navigator>
  );
}