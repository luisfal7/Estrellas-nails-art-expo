import { createStackNavigator } from '@react-navigation/stack';
import { DetailsScreen } from '../screens/DetailsScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}