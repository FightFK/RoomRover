import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
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
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Function to validate email format
    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Correct email format
        return emailPattern.test(email);
    };

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            setAlertMessage("กรุณากรอกอีเมลและรหัสผ่านทั้งหมด");
            setAlertVisible(true);
            return; // Stop execution if any field is empty
        }

        if (!isValidEmail(email)) {
            setAlertMessage("กรุณากรอกอีเมลที่ถูกต้อง");
            setAlertVisible(true);
            return; // Stop execution if email is invalid
        }

        if (password.length < 6) {
            setAlertMessage("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
            setAlertVisible(true);
            return; // Stop execution if password is too short
        }

        if (password !== confirmPassword) {
            setAlertMessage("รหัสผ่านไม่ตรงกัน");
            setAlertVisible(true);
            return; // Stop execution if passwords do not match
        }

        try {
            await auth.signUpWithEmail(email, password);
            navigation.navigate('Home'); // Navigate to Home after successful signup
        } catch (error) {
            setAlertMessage(error.message); // Show error message
            setAlertVisible(true);
        }
    }

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
                
                <Text style={styles.label}>
                    <AntDesign name="user" size={24} color="black" /> Email
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>
                    <MaterialIcons name="password" size={24} color="black" /> Password
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Text style={styles.label}>
                    <MaterialIcons name="password" size={24} color="black" /> Confirm Password
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
