import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You can install this package if not already

export default function News() {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="bell" size={24} color="#FFA500" />
                    <Text style={styles.cardTitle}>ข่าวสารวันนี้</Text>
                </View>
                <Text style={styles.cardDescription}>วันนี้น้ำไม่ไหลนะครับ</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5, // Adds shadow for Android
    },
    cardContent: {
        padding: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333', // Darker color for better readability
    },
    cardDescription: {
        fontSize: 16,
        color: '#555', // Softer color for description
        lineHeight: 22, // Increase line height for better spacing
    },
});
