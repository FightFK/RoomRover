import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function BillAdd() {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'ชำระแล้ว', value: 'ชำระแล้ว' },
        { label: 'ยังไม่ชำระ', value: 'ยังไม่ชำระ' },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.Header}>แก้ไขข้อมูล</Text>
            <Text style={styles.Title}>ชื่อ-นามสกุล ผู้เช่าห้องพัก</Text>
            <TextInput  style={styles.input}/>
            <Text style={styles.Title}>เลขที่ห้องพัก</Text>
            <TextInput  style={styles.input}/>
            <Text style={styles.Title}>วันที่เข้าพัก</Text>
            <TextInput  style={styles.input}/>
            <Text style={styles.Title}>ค่าห้องพัก</Text>
            <TextInput  style={styles.input}/>
            <Text style={styles.Title}>ค่าไฟฟ้า</Text>
            <TextInput  style={styles.input}/>
            <Text style={styles.Title}>ค่าน้ำ</Text>
            <TextInput  style={styles.input}/>
            <Text style={styles.Title}>สถานะการชำระ</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="สถานะ"
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttontext}>ยืนยันการแก้ไข</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    Header: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20
    },
    Title: {
        fontSize: 16,
        marginBottom: 10
    },
    text: {
        marginTop: 10,
        fontSize: 14
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        position: 'absolute',
        bottom: 50, 
        right: 20,
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
})
