import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Getstart({ navigation }) {

    useEffect(() => {
        const auth = getAuth();
        
        // ตรวจสอบสถานะการล็อกอินของผู้ใช้
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // ถ้ามีผู้ใช้เข้าสู่ระบบอยู่แล้ว, นำไปหน้า Home
                navigation.navigate('Home');
            }
        });

        // Cleanup listener เมื่อ component ถูก unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/Room.png')} style={styles.image}>
                <Text style={styles.textapp}>RoomRover</Text>
                <Text style={styles.textabout}>Roomservice & Management</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>GET START</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    textapp: {
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    textabout: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'normal',
    },
    button: {
        backgroundColor: '#29B6F6',
        paddingVertical: 15,
        borderRadius: 5,
        margin: 48,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
