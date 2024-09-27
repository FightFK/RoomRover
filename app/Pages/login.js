import React, { useState } from 'react'; 
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './Styles/login-style';
import { useAuth } from '../../context/authContext';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAlert from './components/CustomAlert'; // Import your CustomAlert component

export default function Login({ navigation }) {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const handleLogin = async () => {
    if (!email || !password) {
      setAlertMessage("กรุณากรอกอีเมลและรหัสผ่าน");
      setAlertVisible(true);
      return; // หยุดการทำงานถ้าอีเมลหรือรหัสผ่านว่าง
    }

    try {
      await auth.signInWithEmail(email, password);
      navigation.navigate('Home'); // นำทางไปหน้า Home ถ้าสำเร็จ
    } catch (error) {
      setAlertMessage(error.message);
      setAlertVisible(true);
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
        <View style={styles.logincontainer}>
          <AntDesign name="user" size={24} color="black" />
          <Text style={styles.label}>Email</Text>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.logincontainer}>
          <MaterialIcons name="password" size={24} color="black" />
          <Text style={styles.label}>Password</Text>
        </View>
        
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
        
      
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't Have Any Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Alert */}
      <CustomAlert 
        visible={alertVisible} 
        onDismiss={() => setAlertVisible(false)} 
        message={alertMessage} 
      />
    </SafeAreaView>
  );
}
