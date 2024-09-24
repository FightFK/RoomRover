import React, { useState } from 'react';
import { View, Text, TouchableOpacity , StyleSheet} from 'react-native';


export default function Bill({navigation}) {
    const [status, setStatus] = useState('ชำระเเล้ว');
    const [mounth, setmounth] = useState('มกราคม 2024');
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Billinfo')}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.cardTitle}>บิลค่าเช่า :</Text>
                        <Text style={styles.cardTitle}>{mounth}</Text>
                        <Text style={styles.cardTitle}>{status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Billinfo')}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.cardTitle}>บิลค่าเช่า :</Text>
                        <Text style={styles.cardTitle}>{mounth}</Text>
                        <Text style={styles.cardTitle}>{status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Billinfo')}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.cardTitle}>บิลค่าเช่า :</Text>
                        <Text style={styles.cardTitle}>{mounth}</Text>
                        <Text style={styles.cardTitle}>{status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Billinfo')}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.cardTitle}>บิลค่าเช่า :</Text>
                        <Text style={styles.cardTitle}>{mounth}</Text>
                        <Text style={styles.cardTitle}>{status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Billinfo')}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.cardTitle}>บิลค่าเช่า :</Text>
                        <Text style={styles.cardTitle}>{mounth}</Text>
                        <Text style={styles.cardTitle}>{status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Billinfo')}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.cardTitle}>บิลค่าเช่า :</Text>
                        <Text style={styles.cardTitle}>{mounth}</Text>
                        <Text style={styles.cardTitle}>{status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
        elevation: 5, // Adds shadow for Android
        padding: 25
    },
    cardImage: {
        width: '100%',
        height: 150,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
})