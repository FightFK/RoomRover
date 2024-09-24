import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import styles from './Styles/login-style';

export default function Login({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // มีไว้ก่อนยังไม่ทำ
  const handleLogin = () => {
  
    if (username === '' || password === '') {
      navigation.navigate('Home');
      // Alert.alert('Error', 'Please fill in all fields.');
    } else {
      
      Alert.alert('Success', 'Login successful!');
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.imgholder}>
        <Image 
          source={require('../../assets/Room.png')} 
          style={styles.img}
        />
      </View>
       <View style={styles.container}>
        <Text style={styles.header}>Welcome</Text>
        <Text style={styles.subHeader}>Login To Your Account</Text>
        
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text>Don't Have Any Account ?
        </Text>
      </View>
     
    </SafeAreaView>
  );
}