import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import stylesz from './Styles/register-style';
import styles from './Styles/login-style';
import { useAuth } from '../../context/authContext';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAlert from './components/CustomAlert'; // Adjust the import path as necessary

export default function Signup({ navigation }) {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [roomNums, setroomNums] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword || !displayName) {
            setAlertMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
            setAlertVisible(true);
            return;
        }

        if (!isValidEmail(email)) {
            setAlertMessage("กรุณากรอกอีเมลที่ถูกต้อง");
            setAlertVisible(true);
            return;
        }

        if (password.length < 6) {
            setAlertMessage("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
            setAlertVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setAlertMessage("รหัสผ่านไม่ตรงกัน");
            setAlertVisible(true);
            return;
        }

        try {
            await auth.signUpWithEmail(email, password, roomNums, displayName, 'user');
            navigation.navigate('Home');
        } catch (error) {
            setAlertMessage(error.message);
            setAlertVisible(true);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={stylesz.imgholder}>
                        <Image 
                            source={require('../../assets/Room.png')} 
                            style={styles.img}
                        />
                    </View> 
                    <Text style={styles.header}>Register</Text>
                    <Text style={styles.subHeader}>Create a new account</Text>

                    {/* Display Name Field */}
                    <Text style={styles.label}>
                        <AntDesign name="user" size={24} color="black" /> Display Name
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Display Name"
                        value={displayName}
                        onChangeText={setDisplayName}
                    />
                    
                    {/* Room Number Field */}
                    <Text style={styles.label}>
                        <AntDesign name="home" size={24} color="black" /> Room Number
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Room Number"
                        value={roomNums}
                        onChangeText={setroomNums}
                    />

                    {/* Email Field */}
                    <Text style={styles.label}>
                        <MaterialIcons name="email" size={24} color="black" /> Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Password Field */}
                    <Text style={styles.label}>
                        <MaterialIcons name="lock" size={24} color="black" /> Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {/* Confirm Password Field */}
                    <Text style={styles.label}>
                        <MaterialIcons name="lock" size={24} color="black" /> Confirm Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                    
                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't Have Any Account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signupLink}> Login </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {/* Custom Alert */}
                <CustomAlert 
                    visible={alertVisible} 
                    onDismiss={() => setAlertVisible(false)} 
                    message={alertMessage} 
                />
            </View>
        </SafeAreaView>
    );
}