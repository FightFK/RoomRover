import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { db } from '../../../config/firebase-config'; // ใช้ Firebase Firestore
import { doc, getDoc, updateDoc } from "firebase/firestore";
import CustomAlert from '../components/CustomAlert'; // Adjust the import path as necessary

export default function ReportEdit({ route, navigation }) {
    const { reportId, uid, roomNums } = route.params; // รับ reportId, uid, roomNums จาก params

    // Alert Components
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [room, setRoom] = useState('');
    const [reports, setReports] = useState('');
    const [status, setStatus] = useState(); // สำหรับ dropdown สถานะ
    const [statusOpen, setStatusOpen] = useState(false); // สำหรับ dropdown สถานะ
    const [comment, setComment] = useState(''); // Define comment state
    const [statusItems, setStatusItems] = useState([
        { label: 'แก้ไขแล้ว', value: 'แก้ไขแล้ว' },
        { label: 'ยังไม่แก้ไข', value: 'ยังไม่แก้ไข' },
    ]);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const reportDocRef = doc(db, `users/${uid}/reports/${reportId}`);
                const reportDoc = await getDoc(reportDocRef);

                if (reportDoc.exists()) {
                    const reportData = reportDoc.data();
                    setRoom(reportData.roomNums || 'ไม่พบหมายเลขห้อง'); // ตั้งค่า room
                    setReports(reportData.issue || 'ไม่พบข้อมูล'); // ตั้งค่า reports
                    setStatus(reportData.status); // ตั้งค่าสถานะ
                    setComment(reportData.comment || ''); // Set initial comment from the report data
                } else {
                    console.log('No such report document!');
                }
            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        fetchReportData();
    }, [reportId, uid]); // เพิ่ม uid ใน dependencies

    const handleUpdateReport = async () => {
        try {
            const reportDocRef = doc(db, `users/${uid}/reports/${reportId}`);
            await updateDoc(reportDocRef, {
                status: status,
                comment: comment, // Now this is defined
            });
            setAlertMessage('ข้อมูลได้ถูกอัปเดตเรียบร้อยแล้ว'); // Set success message
            setAlertVisible(true); // Show the alert
            // เอาเท่ โชว์ Alert หน่อย ทำมา เลยต้องนับเวลา
            setTimeout(() => {
                navigation.goBack();
            }, 2000); 
        } catch (error) {
            console.error('Error updating report:', error);
            setAlertMessage('ไม่สามารถอัปเดตข้อมูลได้'); // Set error message
            setAlertVisible(true); // Show the alert
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>แก้ไขปัญหา</Text>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.reportText}>ห้อง : {roomNums}</Text>
                    <Text style={styles.reportText}>ปัญหา : {reports}</Text>
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
                    <TextInput
                        style={styles.input}
                        value={comment} // Bind the TextInput to the comment state
                        onChangeText={setComment} // Update comment state on input change
                    />
                    <TouchableOpacity style={styles.button} onPress={handleUpdateReport}>
                        <Text style={styles.buttonText}>ยืนยันการแก้ไข</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Custom Alert */}
            <CustomAlert 
                visible={alertVisible} 
                onDismiss={() => setAlertVisible(false)} 
                message={alertMessage} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
    card: {
        backgroundColor: '#E8F0FE',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    cardContent: {
        padding: 20,
    },
    reportText: {
        fontSize: 16,
        color: '#444',
        marginBottom: 15,
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
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
