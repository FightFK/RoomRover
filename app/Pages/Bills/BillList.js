import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../../../config/firebase-config';
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

export default function BillList({ route, navigation }) {
    const { userId } = route.params;
    const [bills, setBills] = useState([]);
    const [displayName, setDisplayName] = useState('');
    const [roomNums, setRoomNums] = useState('');

    // Fetch bills and displayName
    const fetchBillsAndDisplayName = async () => {
        try {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                setDisplayName(userDoc.data().displayName);
                setRoomNums(userDoc.data().roomNums);
            } else {
                console.log("No such user document!");
            }

            const userBillsRef = collection(db, 'bills', userId, 'userBills');
            const querySnapshot = await getDocs(userBillsRef);
            const billsData = [];
            
            querySnapshot.forEach((doc) => {
                billsData.push({ id: doc.id, ...doc.data() });
            });

            setBills(billsData);
        } catch (error) {
            console.error("Error fetching bills or display name: ", error);
        }
    };

    // Function to delete a bill
    const handleDeleteBill = async (billId) => {
        try {
            const billRef = doc(db, 'bills', userId, 'userBills', billId);
            await deleteDoc(billRef);
            Alert.alert('Success', 'บิลถูกลบเรียบร้อยแล้ว');
            fetchBillsAndDisplayName(); // Refresh the bill list after deletion
        } catch (error) {
            console.error("Error deleting bill: ", error);
            Alert.alert('Error', 'ไม่สามารถลบบิลได้');
        }
    };

    // Use useFocusEffect to refetch data when the screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchBillsAndDisplayName();
        }, [userId])
    );

    // Send uid and billId to the EditBills screen
    const renderBillItem = ({ item }) => (
        <View style={styles.billItem}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('EditBills', { billData: item, userId: userId })}
            >
                <Text style={styles.billText}>หมายเลขบิล: {item.id}</Text>
                <Text style={styles.billText}>เดือน: {item.month}</Text>
                <Text style={styles.billText}>ค่าห้องพัก: {item.priceRoom}</Text>
                <Text style={styles.billText}>ค่าไฟฟ้า: {item.priceElectric}</Text>
                <Text style={styles.billText}>ค่าน้ำ: {item.priceWater}</Text>
                <Text style={styles.billText}>สถานะการชำระ: {item.status}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => {
                    Alert.alert(
                        'Confirm Delete',
                        'Are you sure you want to delete this bill?',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'OK', onPress: () => handleDeleteBill(item.id) },
                        ]
                    );
                }}
            >
                <Icon name="trash-outline" size={24} color="#FF4D4D" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>รายการบิลของคุณ</Text>
            <Text style={styles.subHeader}>{displayName} (ห้อง: {roomNums})</Text>
            <FlatList
                data={bills}
                renderItem={renderBillItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
            
            {/* Add Bill Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('BillAdd', { userId: userId })}
            >
                <Icon name="add-circle" size={60} color="#2B4BF2" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F0FE',
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
        paddingBottom: 20,
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
        position: 'relative',
    },
    billText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#444',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 5, // Adds elevation for shadow effect
    },
});
