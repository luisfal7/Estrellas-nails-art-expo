import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEstrellas } from './src/hooks/useEstrellas';

export default function App() {

  const { clients, models,services } = useEstrellas()

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={{backgroundColor:'gray'}}>{JSON.stringify(clients,null,3)}</Text>
        <Text style={{backgroundColor:'red'}}>{JSON.stringify(models,null,3)}</Text>
        <Text style={{backgroundColor:'blue'}}>{JSON.stringify(services,null,3)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
