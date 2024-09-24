import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../config/firebase-config';

export default function Bill({ navigation }) {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true); // State สำหรับจัดการการโหลด
    const auth = getAuth();

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const user = auth.currentUser; // ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่
                if (user) {
                    const uid = user.uid; // ดึง UID ของผู้ใช้
                    const billsRef = collection(db, 'bills', uid, 'userBills'); // เข้าถึง sub-collection
                    const q = query(billsRef); // สร้าง query

                    const querySnapshot = await getDocs(q); // ดึงข้อมูล
                    const billsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setBills(billsData); // อัปเดต state
                }
            } catch (error) {
                console.error("Error fetching bills: ", error);
            } finally {
                setLoading(false); // เปลี่ยนเป็น false หลังจากดึงข้อมูลเสร็จ
            }
        };

        fetchBills(); // เรียกใช้งานฟังก์ชันดึงข้อมูล
    }, [auth]);

    // Render loading state
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading bills...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={bills}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Billinfo', { billId: item.id })}>
                        <View style={styles.card}>
                            <View style={styles.row}>
                                <Text style={styles.cardTitle}>บิลค่าเช่า :</Text>
                                <Text style={styles.cardTitle}>{item.month}</Text>
                                <Text style={[styles.cardTitle, { color: item.status === 'ชำระแล้ว' ? 'green' : 'red' }]}>{item.status}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#444',
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
        elevation: 5,
        padding: 25,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
});
