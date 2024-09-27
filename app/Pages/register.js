import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import stylesz from './Styles/register-style';
import styles from './Styles/login-style';
import { useAuth } from '../../context/authContext';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAlert from './components/CustomAlert'; // Adjust the import path as necessary
import { db } from '../../config/firebase-config'; // Adjust path as necessary
import { doc, getDoc } from "firebase/firestore";

export default function Signup({ navigation }) {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [roomNums, setRoomNums] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isSignupEnabled, setIsSignupEnabled] = useState(false); // State to track signup status
    const [error, setError] = useState('');


    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    // Status For Open or Close Sign Up System
    useEffect(() => {
        const fetchSignupStatus = async () => {
            const statusDocRef = doc(db, 'status', 'statusregister'); // Adjust the path as necessary
            const statusDoc = await getDoc(statusDocRef);
            
            if (statusDoc.exists()) {
                setIsSignupEnabled(statusDoc.data().status); // Get the status
                console.log('Register is Open ?', statusDoc.data().status);
            } else {
                console.log('No such document!');
            }
        };

        fetchSignupStatus();
    }, []);

    const handleSignup = async () => {
        if (isSignupEnabled) {
            setAlertMessage("กรุณาติดต่อเจ้าของหอเพื่อเปิดระบบสมัครสมาชิก");
            setAlertVisible(true);
            return;
        }

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
        setError('');
        try {
            await auth.signUpWithEmail(email, password, roomNums, displayName, 'user');

            navigation.navigate('Signup');
        } catch (e) {
            setError('Email ของคุณมีคนใช้งานอยู่แล้ว')
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
                        onChangeText={setRoomNums}
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
                        <Text style={styles.signupText}>Did you already have an account? Click </Text>                        
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signupLink}> Here </Text>
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
