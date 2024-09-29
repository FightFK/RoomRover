import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../../context/authContext';
import { db } from '../../../config/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Billinfo({ route }) {
    const { billId } = route.params; // Get the billId from params
    const auth = useAuth();
    const [billDetails, setBillDetails] = useState(null); // State to hold bill details
    const [loading, setLoading] = useState(true); // Loading state
    
    useEffect(() => {
        const fetchBillDetails = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const uid = user.uid;
                    const billRef = doc(db, 'bills', uid, 'userBills', billId); // Access specific bill document
                    const billSnap = await getDoc(billRef);
                    
                    if (billSnap.exists()) {
                        setBillDetails(billSnap.data()); // Set the bill details
                    } else {
                        console.log("No such bill!");
                    }
                }
            } catch (error) {
                console.error("Error fetching bill details: ", error);
            } finally {
                setLoading(false); // Stop loading when done
            }
        };

        fetchBillDetails(); // Fetch bill details on component mount
    }, [billId, auth]);

    // Render loading state
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2B4BF2" />
                <Text style={styles.loadingText}>Loading bill details...</Text>
            </View>
        );
    }

    const { 
        status = 'ยังไม่ชำระ', 
        priceRoom = '0', 
        priceWater = '0', 
        priceElectric = '0'
   
    } = billDetails || {}; // Default values

    const total = parseFloat(priceRoom) + parseFloat(priceWater) + parseFloat(priceElectric);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>บิลค่าเช่า <FontAwesome6 name="money-bills" size={24} color="green" /></Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.cardTitle}>สถานะ</Text>
                    <Text style={[styles.cardContent, { color: status === 'ชำระแล้ว' ? 'green' : 'red' }]}>{status}</Text>
                </View>
                <Text style={styles.cardTitle2}>รายการ</Text>

                <View style={styles.row}>
                    <Text style={styles.cardTitle}>ค่าเช่าห้อง</Text>
                    <Text style={styles.cardContent}>{priceRoom} บาท</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.cardTitle}>ค่าน้ำ</Text>
                    <Text style={styles.cardContent}>{priceWater} บาท</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.cardTitle}>ค่าไฟฟ้า</Text>
                    <Text style={styles.cardContent}>{priceElectric} บาท</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.cardTitle}>รวมทั้งสิ้น</Text>
                    <Text style={styles.cardContent}>{total} บาท</Text>
                </View>
                {ShowButton(status)}
            </View>
        </ScrollView>
    );
}

function ShowButton(status) {
    if (status === 'ยังไม่ชำระ') {
        return (
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttontext}>ชำระเงิน</Text>
            </TouchableOpacity>
        );
    }
    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F0FE',
        padding: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    title: {
        marginTop: 15,
        marginLeft: 15,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardTitle2: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#D9D9D9',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 15,
        borderRadius: 5,
    },
    cardContent: {
        fontSize: 16,
        color: '#444',
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
