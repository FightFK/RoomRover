// HomeScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'; 
import styles from './Styles/็Home-Style'; 

function Home() {
  return (
    <View style={styles.container}>
      {/* Top Banner */}
      <Image 
        source={require('../../assets/Room.png')} 
        style={styles.banner}
      />
      <Text style={styles.title}>My Room</Text>

      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="broom" size={32} color="black" />
          <Text style={styles.buttonText}>Cleaning</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="local-shipping" size={32} color="black" />
          <Text style={styles.buttonText}>Parcel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="report" size={32} color="black" />
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome name="envelope" size={32} color="black" />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="wifi" size={32} color="black" />
          <Text style={styles.buttonText}>Network</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome name="file-text" size={32} color="black" />
          <Text style={styles.buttonText}>Bill Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;
