import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { useAuth } from '../../../context/authContext'; // Assuming you have auth context
import { db } from '../../../config/firebase-config';

export default function ReportAdd({ navigation }) {
  const { currentUser } = useAuth(); // Get the current user from the auth context
  const [issue, setIssue] = useState('');

  const handleSubmit = async () => {
    if (!issue) {
      Alert.alert('กรุณากรอกปัญหาของคุณ'); // Alert if issue is empty
      return;
    }
  
    try {
      const reportRef = collection(db, 'users', currentUser.uid, 'reports');
      await addDoc(reportRef, {
        userId: currentUser.uid,
        issue: issue,
        status: 'ยังไม่แก้ไข', // Default status
        comment: '', // Default comment
        createdAt: serverTimestamp(), // Timestamp for creation
      });
  
      Alert.alert('รายงานของคุณถูกส่งเรียบร้อยแล้ว!'); // Alert for successful submission
      navigation.navigate('ReportList', { refresh: true }); // Navigate back to ReportList with a refresh flag
    } catch (error) {
      console.error('Error adding report: ', error);
      Alert.alert('เกิดข้อผิดพลาดในการส่งรายงาน'); // Alert for error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>รายงานปัญหา</Text>
      <TextInput
        style={styles.input}
        placeholder="กรุณากรอกปัญหาของคุณ"
        value={issue}
        onChangeText={setIssue}
        multiline
        numberOfLines={4}
        textAlignVertical="top" // Ensure text starts from top
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>ส่งรายงาน</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F0FE',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // Start text from the top
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
