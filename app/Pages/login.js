import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import styles from './Styles/login-style';
import { useAuth } from '../../context/authContext';

export default function Login({navigation}) {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("กรุณากรอกอีเมลและรหัสผ่าน");
      return; // หยุดการทำงานถ้าอีเมลหรือรหัสผ่านว่าง
    }
  
    try {
      // เรียกใช้ฟังก์ชัน signInWithEmail จาก AuthContext
      await auth.signInWithEmail(email, password);
      navigation.navigate('Home'); // นำทางไปหน้า Home เท่านั้นถ้าสำเร็จ
    } catch (error) {
      // แสดงข้อความข้อผิดพลาดที่ได้รับจาก Firebase
      Alert.alert("Error", error.message);
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
          value={email}
          onChangeText={setEmail}
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
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text>Don't Have Any Account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text>Sign Up</Text></TouchableOpacity>
      </View>
     
    </SafeAreaView>
  );
}