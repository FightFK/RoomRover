import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './app/Pages/Home';  // Path to your Home component
import Getstart from './app/Pages/Getstart';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Getstart /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
