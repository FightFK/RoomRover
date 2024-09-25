import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '../../context/authContext';
import styles from './Styles/Home-Style';

function Home({ navigation }) {
  const auth = useAuth();

  const handleLogout = async () => {
    await auth.logout();
    navigation.navigate('Login'); // Navigate to Login screen after logout
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.email}>{auth.currentUser?.email}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={15} color="black" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Top Banner */}
      <Image 
        source={require('../../assets/Room.png')} 
        style={styles.banner}
      />
      <Text style={styles.title}>My Room</Text>

      {/* Buttons Container (Vertical Layout) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BillAdd')}>
          <FontAwesome name="file-text" size={32} color="black" />
          <Text style={styles.buttonText}>Bill Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="report" size={32} color="black" />
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('News')}>
          <FontAwesome name="envelope" size={32} color="black" />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>       
      </View>
    </SafeAreaView>
  );
}
export default Home;
