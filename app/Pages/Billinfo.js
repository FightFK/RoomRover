import React, { useState } from 'react';
import { View, Text, StyleSheet , TouchableOpacity } from 'react-native';

export default function Billinfo() {
    const [status, setStatus] = useState('ยังไม่ชำระ');
    const [priceRoom, setPriceRoom] = useState('5000');
    const [priceWater, setPriceWater] = useState('300');
    const [priceElectic, setPriceElectic] = useState('400');

    const total = parseFloat(priceRoom) + parseFloat(priceWater) + parseFloat(priceElectic);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>บิลค่าเช่า</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.cardTitle}>สถานะ</Text>
                    <Text style={styles.cardContent}>{status}</Text>
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
                    <Text style={styles.cardContent}>{priceElectic} บาท</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.cardTitle}>รวมทั้งสิ้น</Text>
                    <Text style={styles.cardContent}>{total} บาท</Text>
                </View>
                {ShowButton(status)}
            </View>
        </View>
    );
}

function ShowButton (status){
        if (status === 'ยังไม่ชำระ') {
            return (
                <TouchableOpacity style={styles.button}>
                    <View >
                        <Text style={styles.buttontext}>ชำระเงิน</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return null 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    text: {
        marginTop: 15,
        marginLeft: 15,
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardTitle2: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#D9D9D9',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    cardContent: {
        fontSize: 16,
        color: '#444',
    },
    button: {
        width: 'auto',
        height: 'auto',
        padding: 7,
        backgroundColor: '#2B4BF2',
        position: 'absolute',
        bottom: 370,  // Distance from the bottom of the screen
        right: 20,   // Distance from the right of the screen
        borderRadius: 5,
    },
    buttontext: {
        fontSize:20,
        color: '#fff',
        textAlign: 'center'
    },
});
