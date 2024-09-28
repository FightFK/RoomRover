import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../../config/firebase-config';
import Loading from '../components/Loading';
export default function Bill({ navigation,route }) {
    const { displayName } = route.params; // Get UID from params
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
           <Loading/>
        );
    }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>ชื่อผู้เช่า: {displayName}</Text>
                </View>
                <FlatList
                    data={bills}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Billinfo', { billId: item.id })}>
                            <View style={styles.card}>
                                <View style={styles.row}>
                                    <Text style={styles.cardTitle}>บิลค่าเช่า:</Text>
                                    <Text style={styles.monthText}>
                                        {item.month === '1' ? 'เดือนมกราคม' :
                                        item.month === '02' ? 'เดือนกุมภาพันธ์' :
                                        item.month === '03' ? 'เดือนมีนาคม' :
                                        item.month === '04' ? 'เดือนเมษายน' :
                                        item.month === '05' ? 'เดือนพฤษภาคม' :
                                        item.month === '06' ? 'เดือนมิถุนายน' :
                                        item.month === '07' ? 'เดือนกรกฎาคม' :
                                        item.month === '08' ? 'เดือนสิงหาคม' :
                                        item.month === '09' ? 'เดือนกันยายน' :
                                        item.month === '10' ? 'เดือนตุลาคม' :
                                        item.month === '11' ? 'เดือนพฤศจิกายน' :
                                        item.month === '12' ? 'เดือนธันวาคม' :
                                        'เดือนไม่ทราบ'}
                                    </Text>
                                    <Text style={[styles.cardStatus, { color: item.status === 'ชำระแล้ว' ? 'green' : 'red' }]}>{item.status}</Text>
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
            padding: 15,
            backgroundColor: '#f0f0f0', // Light background for better contrast
        },
        header: {
            marginBottom: 15,
            padding: 10,
            backgroundColor: '#007AFF', // Blue header background
            borderRadius: 8,
        },
        headerText: {
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
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
            backgroundColor: '#ffffff', // White card background
            borderRadius: 10,
            overflow: 'hidden',
            marginVertical: 10,
            padding: 15,
            elevation: 2, // Adding slight elevation for a shadow effect
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
        },
        cardTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333', // Darker text for better readability
        },
        monthText: {
            fontSize: 16,
            color: '#555', // Slightly lighter color for month text
        },
        cardStatus: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    });
