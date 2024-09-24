import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import stylesz from './Styles/register-style';
import styles from './Styles/login-style';
export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // ฟิลด์สำหรับยืนยันรหัสผ่าน

    const handleSignup = () => {
 
        if (username === '' || password === '' || confirmPassword === '') {
            Alert.alert('Error', 'Please fill in all fields.');
        } else if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
        } else {
        
            Alert.alert('Success', 'Signup successful!');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
           <View style={stylesz.imgholder}>
        <Image 
          source={require('../../assets/Room.png')} 
          style={styles.img}
        />
      </View> 
      <View style={styles.container}>
        <Text style={styles.header}>Register</Text>
        <Text style={styles.subHeader}>Create a new account</Text>
        
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
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
         <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign  Up</Text>
        </TouchableOpacity>
        <Text>Already have account ? </Text>
      </View>
        </SafeAreaView>
    );
}
