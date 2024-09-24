import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './app/Pages/Home';  // Path to your Home component
import Routes from './app/routes';
import { AuthProvider } from './context/authContext';
export default function App() {
  return (
    
    <View style={styles.container}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
