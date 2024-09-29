import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { db } from '../../../config/firebase-config';
import { doc, getDoc, getDocs, setDoc, collection } from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

export default function BillAdd({ route, navigation }) {
    const { userId } = route.params; // Get UID for adding bill  
    const [displayName, setDisplayName] = useState(''); // State for displayName
    const [roomNums, setroomNums] = useState(''); // State for room number
    const [priceRoom, setPriceRoom] = useState('');
    const [priceWater, setPriceWater] = useState('');
    const [priceElectric, setPriceElectric] = useState('');
    const [month, setMonth] = useState(null);

    // Dropdown state for month selection
    const [open, setOpen] = useState(false);

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

    // Fetch displayName based on userId
    useEffect(() => {
        const fetchDisplayName = async () => {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                setDisplayName(userDoc.data().displayName);
                setroomNums(userDoc.data().roomNums);
            } else {
                console.log("No such document!");
            }
        };
        fetchDisplayName();
    }, [userId]);

    const handleSubmit = async () => {
        try {
            // Step 1: Get the current maximum billId
            const userBillsRef = collection(db, 'bills', userId, 'userBills');
            const querySnapshot = await getDocs(userBillsRef);
            let maxBillId = 0;

            // Loop through the documents to find the highest billId
            querySnapshot.forEach((doc) => {
                const billId = parseInt(doc.id); // Assuming the document id is the billId
                if (billId > maxBillId) {
                    maxBillId = billId;
                }
            });

            // Step 2: Calculate the new billId
            const newBillId = maxBillId + 1;

            // Step 3: Create a new document with the new billId
            const billRef = doc(db, 'bills', userId, 'userBills', newBillId.toString());
            await setDoc(billRef, {
                month, // Add the selected month
                priceRoom,
                priceWater,
                priceElectric,
                status: 'ยังไม่ชำระ', // Set default status
            }, { merge: true });

            alert('ข้อมูลบิลถูกเพิ่มแล้ว');
            navigation.goBack(); // Go back to BillInfo

        } catch (error) {
            console.error("Error updating bill: ", error);
            alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Header}>เพิ่มข้อมูลบิล</Text>
            <Text style={styles.Title}>ชื่อผู้เช่า</Text>
            <TextInput
                style={styles.input}
                value={displayName} // Display displayName
                editable={false} // Disable editing
            />
            <Text style={styles.Title}>หมายเลขห้องพัก</Text>
            <TextInput
                style={styles.input}
                value={roomNums}
                editable={false} // Disable editing
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
                open={open}
                value={month}
                items={monthItems}
                setOpen={setOpen}
                setValue={setMonth}
                setItems={setMonthItems}
                placeholder="เลือกเดือน"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttontext}>ยืนยันการเพิ่มข้อมูลบิล</Text>
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
        position: 'absolute',
        bottom: 50,
        right: 20,
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
