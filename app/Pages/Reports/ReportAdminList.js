import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../../../config/firebase-config'; // ใช้ Firebase Firestore
import { collectionGroup, getDocs, doc, getDoc } from "firebase/firestore";
import Loading from '../components/Loading';
export default function ReportList({ navigation }) {
    const [reports, setReports] = useState([]); // เก็บรายการ report ทั้งหมด
    const [loading, setLoading] = useState(true); // Loading state

    // ดึงข้อมูลชื่อห้อง
    const fetchRoomNums = async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId); // อ้างอิงถึงผู้ใช้ใน Collection 'users'
            const userDoc = await getDoc(userDocRef); // ดึงข้อมูลของผู้ใช้
            if (userDoc.exists()) {
                return userDoc.data().roomNums; // ดึง roomNums ของผู้ใช้
            } else {
                console.log('No such user document!');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    const fetchReports = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const reportsSnapshot = await getDocs(collectionGroup(db, 'reports'));
            const reportsData = await Promise.all(reportsSnapshot.docs.map(async (doc) => {
                const report = doc.data();
                const roomNums = await fetchRoomNums(report.userId);
                return {
                    id: doc.id,
                    ...report,
                    roomNums: roomNums || 'ไม่พบหมายเลขห้อง'
                };
            }));

            // เรียงลำดับ reports ตาม createdAt
            reportsData.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt.seconds * 1000) : new Date(0); // กรณีไม่มี
                const dateB = b.createdAt ? new Date(b.createdAt.seconds * 1000) : new Date(0); // กรณีไม่มี
                return dateB - dateA; // เรียงลำดับจากใหม่ไปเก่า
            });

            setReports(reportsData);
        } catch (error) {
            console.error('Error fetching reports: ', error);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        const unsubscribeFocusListener = navigation.addListener('focus', () => {
            fetchReports(); // Fetch reports when the screen comes into focus
        });

        // Initial fetch when the component mounts
        fetchReports();

        // Cleanup the listener on unmount
        return () => {
            unsubscribeFocusListener();
        };
    }, [navigation]); // Include navigation as a dependency

    // ฟังก์ชัน render item ใน FlatList
    const renderReportItem = ({ item }) => {
        // Determine the border color based on the status
        const borderColor = item.status === 'แก้ไขแล้ว' ? 'green' : 'yellow'; // Set color based on status
    
        return (
            <TouchableOpacity
                style={[styles.reportItem, { borderColor }]} // Apply the border color conditionally
                onPress={() => navigation.navigate('ReportEdit', { reportId: item.id, uid: item.userId, roomNums: item.roomNums })}
            >
                <Text style={styles.reportText}>ห้อง: {item.roomNums}</Text>
                <Text style={styles.reportText}>ปัญหา: {item.issue}</Text>
                <Text style={styles.reportText}>สถานะ: {item.status}</Text>
                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsHeader}>ความคิดเห็นจากแอดมิน:</Text>
                    <Text>{item.comment ? item.comment : 'ยังไม่มีความคิดเห็น'}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return <Loading/>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>รายงานปัญหา</Text>
            <FlatList
                data={reports}
                renderItem={renderReportItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#E8F0FE',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    reportItem: {
        backgroundColor: '#FFF',
        padding: 20,
        borderWidth: 2, // Increased width for visibility
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
        marginBottom: 5,
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
});
