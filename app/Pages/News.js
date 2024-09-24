import React from 'react'
import { View, Text, TouchableOpacity , StyleSheet } from 'react-native';

export default function News() {
    return (
    <View style={styles.card}>
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>ข่าวสารวันนี้</Text>
            <Text style={styles.cardDescription}>วันนี้น้ำไม่ไหลนะครับ</Text>
        </View>
    </View>
    )
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
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardDescription: {
        marginTop: 10,
        fontSize: 14,
        color: '#444',
    },
});
