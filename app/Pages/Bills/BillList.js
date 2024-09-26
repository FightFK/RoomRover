import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../../../config/firebase-config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default function BillList({ route, navigation }) {
    const { userId } = route.params; // Get UID from params
    const [bills, setBills] = useState([]); // State to store bills
    const [displayName, setDisplayName] = useState(''); // State to store displayName
    const [roomNums, setRoomNums] = useState(''); // State to store room number

    useEffect(() => {
        const fetchBillsAndDisplayName = async () => {
            try {
                // Fetch user's displayName
                const userRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setDisplayName(userDoc.data().displayName);
                    setRoomNums(userDoc.data().roomNums);
                } else {
                    console.log("No such user document!");
                }

                // Fetch bills
                const userBillsRef = collection(db, 'bills', userId, 'userBills');
                const querySnapshot = await getDocs(userBillsRef);
                const billsData = [];
                
                querySnapshot.forEach((doc) => {
                    billsData.push({ id: doc.id, ...doc.data() }); // Add bill id and data to array
                });

                setBills(billsData); // Set the bills state
            } catch (error) {
                console.error("Error fetching bills or display name: ", error);
            }
        };

        fetchBillsAndDisplayName();
    }, [userId]);

    const renderBillItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.billItem}
            // Navigate to edit bill
            onPress={() => navigation.navigate('EditBills')}
        >
            <Text style={styles.billText}>หมายเลขบิล: {item.id}</Text>
            <Text style={styles.billText}>เดือน: {item.month}</Text>
            <Text style={styles.billText}>ค่าห้องพัก: {item.priceRoom}</Text>
            <Text style={styles.billText}>ค่าไฟฟ้า: {item.priceElectric}</Text>
            <Text style={styles.billText}>ค่าน้ำ: {item.priceWater}</Text>
            <Text style={styles.billText}>สถานะการชำระ: {item.status}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>รายการบิลของคุณ</Text>
            <Text style={styles.subHeader}>{displayName} (ห้อง: {roomNums})</Text>
            <FlatList
                data={bills}
                renderItem={renderBillItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false} // Hide scroll indicator
                contentContainerStyle={styles.flatListContent} // Add some padding at the top
            />
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subHeader: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    flatListContent: {
        paddingBottom: 20, // Add padding to the bottom of the FlatList
    },
    billItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    billText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#444',
    },
});
