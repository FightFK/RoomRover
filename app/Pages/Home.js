// HomeScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'; 
import styles from './Styles/Home-Style'; 
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '../../context/authContext';
function Home() {
  const auth = useAuth();
  console.log("User Email:", auth.currentUser.email);
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Banner */}
      <Image 
        source={require('../../assets/Room.png')} 
        style={styles.banner}
      />
      <Text style={styles.title}>My Room</Text>

      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
          <FontAwesome name="file-text" size={32} color="black" />
          <Text style={styles.buttonText}>Bill Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="report" size={32} color="black" />
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome name="envelope" size={32} color="black" />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>       
      </View>
    </SafeAreaView>
  );
}

export default Home;
