import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase-config';

export default function UserList({ navigation }) {
    const [users, setUsers] = useState([]);
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
        navigation.navigate('BillList', { userId }); // Navigate to BillList when user is pressed
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>All Users</Text>

            {loading ? ( // Show loading indicator while data is being fetched
                <Text>Loading...</Text>
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
});
