import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const CustomAlert = ({ visible, onDismiss, message }) => {

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
        >
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    <Text style={styles.alertTitle}><AntDesign name="notification" size={24} color="red" />แจ้งเตือน</Text>
                    <Text style={styles.alertMessage}>{message}</Text>
                    <TouchableOpacity onPress={onDismiss} style={styles.alertButton}>
                        <Text style={styles.alertButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    alertButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    alertButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CustomAlert;
