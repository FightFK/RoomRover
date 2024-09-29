import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { collection, getDocs, query, getDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { db } from '../../../config/firebase-config';
import Loading from '../components/Loading';

export default function Bill({ navigation }) {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState(''); // State to hold display name
    const auth = getAuth(); // Initialize Firebase Auth

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // เมื่อผู้ใช้เปลี่ยนแปลง, เรียก fetchBills ใหม่
                fetchBills(user);
            } else {
                // ถ้าไม่มีผู้ใช้ล็อกอิน, รีเซ็ตข้อมูล
                setBills([]);
                setDisplayName('');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    const fetchBills = async (user) => {
        setLoading(true); // เริ่มการโหลดข้อมูลใหม่
        try {
            if (user) {
                const uid = user.uid;

                // Fetch user's display name
                const userDoc = await getDoc(doc(db, 'users', uid));
                if (userDoc.exists()) {
                    setDisplayName(userDoc.data().displayName);
                } else {
                    console.log("No such user document!");
                }

                // Query bills for the current user
                const billsRef = collection(db, 'bills', uid, 'userBills');
                const q = query(billsRef);
                const querySnapshot = await getDocs(q);

                // Map query results to array
                const billsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setBills(billsData); // Set the bills data
            }
        } catch (error) {
            console.error("Error fetching bills: ", error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    // Render loading state
    if (loading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>ชื่อผู้เช่า: {displayName}</Text>
            </View>
            <FlatList
                data={bills} // ข้อมูลบิลของ currentUser ที่ล็อกอินอยู่
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
        backgroundColor: '#E8F0FE',
    },
    header: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 8,
    },
    headerText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    monthText: {
        fontSize: 16,
        color: '#555',
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
