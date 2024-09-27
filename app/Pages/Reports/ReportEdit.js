import React from 'react'
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ReportEdit() {

    const [room, setRoom] = useState('105');
    const [reports, setReports] = useState('น้ำไม่ไหล');
    const [status, setStatus] = useState(); // For the status dropdown
    const [statusOpen, setStatusOpen] = useState(false); // For the status dropdown

    // Month selection state
    const [statusItems, setStatusItems] = useState([
        { label: 'แก้ไขแล้ว', value: '01' },
        { label: 'ยังไม่แก้ไข', value: '02' },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>แก้ไขปัญหา</Text>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.reportText}>ห้อง : {room} </Text>
                    <Text style={styles.reportText}>ปัญหา : {reports} </Text>
                    <Text style={styles.reportText}>สถานะ </Text>
                    <DropDownPicker
                        style={styles.dropdown}
                        open={statusOpen}
                        value={status}
                        items={statusItems}
                        setValue={setStatus}
                        setOpen={setStatusOpen}
                        setItems={setStatusItems}
                        placeholder="สถานะ"
                    />
                    <Text style={styles.reportText}>ความคิดเห็น </Text>
                    <TextInput style={styles.input} />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>ยืนยันการแก้ไข</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5, // Adds shadow for Android
    },
    headerText:{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    cardContent: {
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333', // Darker color for better readability
    },
    cardDescription: {
        fontSize: 16,
        color: '#555', // Softer color for description
        lineHeight: 22, // Increase line height for better spacing
    },
    reportText: {
        fontSize: 16,
        color: '#444',
        marginBottom: 15
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    dropdown: {
        marginBottom: 10
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
}); 

