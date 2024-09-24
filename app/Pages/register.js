import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import stylesz from './Styles/register-style';
import styles from './Styles/login-style';
import { useAuth } from '../../context/authContext';

export default function Signup({ navigation }) {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // ฟิลด์สำหรับยืนยันรหัสผ่าน

    // ฟังก์ชันสำหรับตรวจสอบรูปแบบอีเมล
    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // รูปแบบอีเมลที่ถูกต้อง
        return emailPattern.test(email);
    };

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("กรุณากรอกอีเมลและรหัสผ่านทั้งหมด");
            return; // หยุดการทำงานถ้าอีเมลหรือรหัสผ่านว่าง
        }

        if (!isValidEmail(email)) {
            Alert.alert("กรุณากรอกอีเมลที่ถูกต้อง");
            return; // หยุดการทำงานถ้าอีเมลไม่ถูกต้อง
        }

        if (password.length < 6) {
            Alert.alert("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
            return; // หยุดการทำงานถ้ารหัสผ่านน้อยกว่า 6 ตัวอักษร
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'รหัสผ่านไม่ตรงกัน');
            return;
        }

        try {
            await auth.signUpWithEmail(email, password);
            // เปลี่ยนเส้นทางไปยังหน้าหลังจากลงทะเบียนสำเร็จ
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', error.message); // แสดงข้อความข้อผิดพลาด
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
                
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
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
                <Text style={styles.label}>Confirm Password</Text>
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
                        <Text style={styles.signupLink}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
