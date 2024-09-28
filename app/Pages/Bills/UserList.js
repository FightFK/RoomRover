import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase-config';
import { FontAwesome } from '@expo/vector-icons'; // Importing FontAwesome for the close icon
import Loading from '../components/Loading';
export default function UserList({ navigation }) {
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null); // Store selected user ID
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersRef = collection(db, 'users'); 
                const querySnapshot = await getDocs(usersRef);
                const usersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Sort users based on roomNums
                const sortedUsers = usersData.sort((a, b) => {
                    return a.roomNums - b.roomNums; // Assuming roomNums is a number
                });

                setUsers(sortedUsers); // Set sorted users
            } catch (error) {
                console.error('Error fetching users: ', error);
            } finally {
                setLoading(false); // Set loading to false when data is fetched
            }
        };

        fetchUsers(); // Call the function on component mount
    }, []);

    const handleUserPress = (userId) => {
        setSelectedUserId(userId);
        setModalVisible(true); // Show modal when user is pressed
    };

    const handleAddBill = () => {
        setModalVisible(false);
        navigation.navigate('BillAdd', { userId: selectedUserId }); // Navigate to add bill
    };

    const handleEditBill = () => {
        setModalVisible(false);
        navigation.navigate('BillList', { userId: selectedUserId }); // Navigate to edit bill
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>All Users</Text>

            {loading ? ( // Show loading indicator while data is being fetched
               <Loading />
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleUserPress(item.id)}>
                            <View style={styles.card}>
                                <Text style={styles.cardText}>คุณ: {item.displayName} หมายเลขห้องพัก: {item.roomNums}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false} // Hide scroll indicator for a cleaner look
                />
            )}

            {/* Modal for selecting add/edit */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <FontAwesome name="times" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>เลือกการดำเนินการ</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleAddBill}>
                            <Text style={styles.modalButtonText}>เพิ่มบิล</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleEditBill}>
                            <Text style={styles.modalButtonText}>ประวัติบิลก่อนหน้า</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center', // Center the header text
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
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#2B4BF2',
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
