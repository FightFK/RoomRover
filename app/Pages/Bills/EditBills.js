import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { db } from '../../../config/firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

export default function EditBills({ route, navigation }) {
    const { billData, userId } = route.params;

    const [displayName, setDisplayName] = useState('');
    const [roomNums, setRoomNums] = useState('');
    const [priceRoom, setPriceRoom] = useState(billData.priceRoom);
    const [priceWater, setPriceWater] = useState(billData.priceWater);
    //จำนวนหน่วยไฟฟ้า
    const [electricUnits, setElectricUnits] = useState(''); // State for electric units
    //ราคาไฟฟ้าหลัง คำนวณ
    const [priceElectric, setPriceElectric] = useState(billData.priceElectric); // Price to be calculated
    console.log("ราคา"+priceElectric)
    const [month, setMonth] = useState(billData.month);
    const [status, setStatus] = useState(billData.status);

    const [monthOpen, setMonthOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);

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

    const [pricePerUnit, setPricePerUnit] = useState(0); // State for price per unit

    const isFocused = useIsFocused();

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
    //Fetch หน่วยไฟฟ้าจากฐานมาเก็บรอคำนวณให้
    const fetchPricePerUnit = async () => {
        const utilityRef = doc(db, 'utilities', 'Electric');
        const utilityDoc = await getDoc(utilityRef);
        if (utilityDoc.exists()) {
            setPricePerUnit(utilityDoc.data().PricePerUnit);
        } else {
            console.log("No price per unit found!");
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchUserData();
            fetchPricePerUnit(); // Fetch the price per unit
        }
    }, [isFocused]);

    const handleSubmit = async () => {
        try {
            const totalElectricPrice = electricUnits ? pricePerUnit * parseFloat(electricUnits) : 0; // Calculate total price based on units
            const billRef = doc(db, 'bills', userId, 'userBills', billData.id);
            await setDoc(billRef, {
                month,
                priceRoom,
                priceWater,
                priceElectric: totalElectricPrice, // Store calculated price
                status,
            }, { merge: true });
            alert('ข้อมูลบิลถูกอัปเดตแล้ว');
            navigation.goBack();
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
            <Text style={styles.Title}>จำนวนหน่วยไฟฟ้าที่ใช้</Text>
            <TextInput
                style={styles.input}
                value={electricUnits}
                onChangeText={setElectricUnits}
                placeholder="จำนวนหน่วยไฟฟ้า"
                keyboardType="numeric"
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
                setOpen={setMonthOpen}
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
        backgroundColor: '#E8F0FE',
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
