import React, { useEffect, useState } from 'react';
import { View , Text , StyleSheet , TextInput ,TouchableOpacity} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';


export default function EditBills() {

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');

    // Month selection state
    const [statusItems, setStatusItems] = useState([
        { label: 'ชำระแล้ว', value: 'ชำระแล้ว' },
        { label: 'ยังไม่ชำระ', value: 'ยังไม่ชำระ' },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.Header}>แก้ไขข้อมูลบิล</Text>
            <Text style={styles.Title}>ชื่อผู้เช่า</Text>
            <TextInput  style={styles.input}
                
            />
            <Text style={styles.Title}>หมายเลขห้องพัก</Text>
            <TextInput  style={styles.input} 
                
            />
            <Text style={styles.Title}>ค่าห้องพัก</Text>
            <TextInput  style={styles.input}
                
            />
            <Text style={styles.Title}>ค่าไฟฟ้า</Text>
            <TextInput   style={styles.input}
                
            />
            <Text style={styles.Title}>ค่าน้ำ</Text>
            <TextInput   style={styles.input}
                
            />
            <Text style={styles.Title}>เดือน</Text>
            <TextInput   style={styles.input} 

            />

            <Text style={styles.Title}>สถานะ</Text>
            <DropDownPicker
                open={open}
                value={status}
                items={statusItems}
                setOpen={setOpen}
                setValue={setStatus}
                setItems={setStatusItems}
                placeholder="สถานะ"
            />
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttontext}>ยืนยันการแก้ไขข้อมูลบิล</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    Header: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    Title: {
        fontSize: 16,
        marginBottom: 10,
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
