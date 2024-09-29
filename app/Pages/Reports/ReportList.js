import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore'; 
import { useAuth } from '../../../context/authContext'; // Assuming you have auth context
import { db } from '../../../config/firebase-config';
import Loading from '../components/Loading';

export default function ReportList({ navigation, route }) {
  const { currentUser } = useAuth(); // Get the current user from the auth context
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // State สำหรับจัดการการโหลด

  useEffect(() => {
    const fetchReports = async () => {
      if (currentUser) {
        try {
          const reportsRef = collection(db, 'users', currentUser.uid, 'reports');
          const reportsQuery = query(reportsRef, orderBy('createdAt', 'desc')); // Order by createdAt
          const querySnapshot = await getDocs(reportsQuery);
          const reportsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReports(reportsData);
        } catch (error) {
          console.error('Error fetching reports: ', error);
        } finally {
          setLoading(false); // เปลี่ยนเป็น false หลังจากดึงข้อมูลเสร็จ
        }
      }
    };

    fetchReports();
  }, [currentUser, route.params?.refresh]); // Add route.params?.refresh to dependencies

  const renderReportItem = ({ item }) => {
    // Determine the border color based on the status
    const borderColor = item.status === 'ยังไม่แก้ไข' ? '#FFC107' : '#00FF00'; // Yellow for 'ยังไม่แก้ไข', Green for 'แก้ไขแล้ว'

    return (
      <TouchableOpacity 
        style={[styles.reportItem, { borderColor }]} // Apply dynamic border color
      >
        <Text style={styles.reportText}>ปัญหา: {item.issue}</Text>
        <Text style={styles.reportText}>สถานะ: {item.status}</Text>
        
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsHeader}>ความคิดเห็นจากแอดมิน:</Text>
          {item.comment === '' ? (
            <Text>ไม่มีความคิดเห็นจากแอดมิน</Text>
          ) : (
            <Text>{item.comment}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const handleReportPress = () => {
    navigation.navigate('ReportAdd'); // Navigate to report creation screen
  };

  if (loading) {
    return (
     <Loading />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>รายงานปัญหาของคุณ</Text>
      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handleReportPress}>
        <Text style={styles.buttonText}>+</Text>
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
  reportItem: {
    backgroundColor:'#FFF',
    padding: 20,
    borderWidth: 5, // Set a border width
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reportText: {
    fontSize: 16,
    color: '#444',
  },
  commentsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  commentsHeader: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 24,
  },
});
