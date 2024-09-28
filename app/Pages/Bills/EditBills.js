import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native'; // นำเข้า useIsFocused
import { db } from '../../../config/firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

export default function EditBills({ route, navigation }) {
    const { billData, userId } = route.params; // Get bill data and userId from route params

    const [displayName, setDisplayName] = useState(''); // State for displayName
    const [roomNums, setRoomNums] = useState(''); // State for room number
    const [priceRoom, setPriceRoom] = useState(billData.priceRoom);
    const [priceWater, setPriceWater] = useState(billData.priceWater);
    const [priceElectric, setPriceElectric] = useState(billData.priceElectric);
    const [month, setMonth] = useState(billData.month);
    const [status, setStatus] = useState(billData.status);

    // Separate open state for each dropdown
    const [monthOpen, setMonthOpen] = useState(false); // For the month dropdown
    const [statusOpen, setStatusOpen] = useState(false); // For the status dropdown

    // Month selection state
    const [monthItems, setMonthItems] = useState([
        { label: 'มกราคม', value: '01' },
        { label: 'กุมภาพันธ์', value: '02' },
        { label: 'มีนาคม', value: '03' },
        { label: 'เมษายน', value: '04' },
        { label: 'พฤษภาคม', value: '05' },
        { label: 'มิถุนายน', value: '06' },
        { label: 'กรกฎาคม', value: '07' },
        { label: 'สิงหาคม', value: '08' },
        { label: 'กันยายน', value: '09' },
        { label: 'ตุลาคม', value: '10' },
        { label: 'พฤศจิกายน', value: '11' },
        { label: 'ธันวาคม', value: '12' },
    ]);

    const isFocused = useIsFocused(); // เช็คว่า component นี้ถูกโฟกัสหรือไม่

    // Fetch displayName and room number based on userId
    const fetchUserData = async () => {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            setDisplayName(userDoc.data().displayName);
            setRoomNums(userDoc.data().roomNums);
        } else {
            console.log("No such document!");
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchUserData(); // เรียกใช้ฟังก์ชันดึงข้อมูลเมื่อโฟกัส
        }
    }, [isFocused]); // จะเรียกใช้เมื่อ isFocused เปลี่ยนแปลง

    const handleSubmit = async () => {
        try {
            const billRef = doc(db, 'bills', userId, 'userBills', billData.id);
            await setDoc(billRef, {
                month,
                priceRoom,
                priceWater,
                priceElectric,
                status,
            }, { merge: true });
            alert('ข้อมูลบิลถูกอัปเดตแล้ว');
            navigation.goBack(); // Go back to the previous screen
        } catch (error) {
            console.error("Error updating bill: ", error);
            alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Header}>แก้ไขข้อมูลบิล</Text>
            <Text style={styles.Title}>ชื่อผู้เช่า</Text>
            <TextInput
                style={styles.input}
                value={displayName}
                editable={false}
            />
            <Text style={styles.Title}>หมายเลขห้องพัก</Text>
            <TextInput
                style={styles.input}
                value={roomNums}
                editable={false}
            />
            <Text style={styles.Title}>ค่าห้องพัก</Text>
            <TextInput
                style={styles.input}
                value={priceRoom}
                onChangeText={setPriceRoom}
                placeholder="ค่าห้องพัก"
            />
            <Text style={styles.Title}>ค่าไฟฟ้า</Text>
            <TextInput
                style={styles.input}
                value={priceElectric}
                onChangeText={setPriceElectric}
                placeholder="ค่าไฟฟ้า"
            />
            <Text style={styles.Title}>ค่าน้ำ</Text>
            <TextInput
                style={styles.input}
                value={priceWater}
                onChangeText={setPriceWater}
                placeholder="ค่าน้ำ"
            />
            <Text style={styles.Title}>เดือน</Text>
            <DropDownPicker
                open={monthOpen}
                value={month}
                items={monthItems}
                setValue={setMonth}
                setItems={setMonthItems}
                placeholder="เลือกเดือน"
            />
            <Text style={styles.Title}>สถานะ</Text>
            <DropDownPicker
                open={statusOpen}
                value={status}
                items={[
                    { label: 'ชำระแล้ว', value: 'ชำระแล้ว' },
                    { label: 'ยังไม่ชำระ', value: 'ยังไม่ชำระ' },
                ]}
                setOpen={setStatusOpen}
                setValue={setStatus}
                placeholder="เลือกสถานะ"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttontext}>ยืนยันการอัปเดตข้อมูลบิล</Text>
            </TouchableOpacity>
        </View>
    );
}

// styles...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    Header: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    Title: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#2B4BF2',
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },

    buttontext: {
        fontSize: 20,
        color: '#fff',
    },
});
