import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '../../context/authContext';
import { auth, db } from "../../config/firebase-config";
import { doc, getDoc, setDoc } from 'firebase/firestore';  // เพิ่ม setDoc สำหรับบันทึกข้อมูล
import styles from './Styles/Home-Style';

function Home({ navigation }) {
  const authContext = useAuth();
  const [displayName, setDisplayName] = useState('User'); // Default display name
  const [roomNums, setRoomNums] = useState(''); // Default Room Numbers
  const [userRole, setUserRole] = useState(''); // State to store user role
  const [modalVisible, setModalVisible] = useState(false); // State for Visible Modal For Edit Announcement
  const [announcement, setAnnouncement] = useState("ไม่มีประกาศ");

  const handleLogout = async () => {
    try {
      await authContext.logout();  // เรียกใช้งานฟังก์ชัน logout
      navigation.navigate('Login'); // นำทางกลับไปยังหน้า Login
    } catch (error) {
      console.error('Logout error: ', error);  // แสดงข้อผิดพลาดถ้าเกิดขึ้น
    }
  };

  // Fetch User and Announcement Data
  useEffect(() => {
    const fetchUserData = async () => {
      if (authContext.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', authContext.currentUser.uid));
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName); // Fetch displayName from Firestore
          setRoomNums(userDoc.data().roomNums);
          setUserRole(userDoc.data().role); // Fetch user role from Firestore
        } else {
          console.log("No such document!");
        }
      }
    };

    const fetchAnnouncement = async () => {
      const announcementDoc = await getDoc(doc(db, 'announcement', 'latest'));
    
      if (announcementDoc.exists()) {
        setAnnouncement(announcementDoc.data().text); // Fetch announcement from Firestore
      }
    };

    fetchUserData();
    fetchAnnouncement();  // Fetch the latest announcement
  }, [authContext.currentUser]);

  // Save Announcement to Firestore
  const handleSaveAnnouncement = async () => {
    try {
      await setDoc(doc(db, 'announcement', 'latest'), {
        text: announcement
      });
      console.log("Announcement saved:", announcement);
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
    console.log("Announcement saved:", announcement);
    setModalVisible(false); // Close modal after saving
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello, </Text>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.roomNumber}> ห้อง: {roomNums}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Top Banner */}
      <Image source={require('../../assets/Room.png')} style={styles.banner} />

      {/* News Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.headerContainer}>
            <FontAwesome name="bell" size={24} color="#FFA500" />
            <Text style={styles.cardTitle}>ข่าวสารวันนี้</Text>
            
            {userRole === 'admin' && (
              <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => setModalVisible(true)} // Open modal on button press
              >
                <AntDesign name="edit" size={28} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.cardDescription}>{announcement}</Text>
        </View>
      </View>

      {/* Modal for Editing Announcement */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>แก้ไขประกาศ</Text>
          <TextInput
            style={styles.modalInput}
            value={announcement}
            onChangeText={setAnnouncement}
            placeholder="พิมพ์ประกาศใหม่ที่นี่..."
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.buttons, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttons, styles.buttonSave]}
              onPress={handleSaveAnnouncement} // Save announcement
            >
              <Text style={styles.textStyle}>บันทึก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Buttons Container (Vertical Layout) */}
      <View style={styles.buttonContainer}>
        {userRole === 'user' ? (
          <>
            <Text style={styles.title}>My Room</Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('Bill', { displayName })} // Pass Parameter
            >
              <FontAwesome name="file-text" size={32} color="black" />
              <Text style={styles.buttonText}>Bill Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReportList')}>
              <MaterialIcons name="report" size={32} color="black" />
              <Text style={styles.buttonText}>Report</Text>
            </TouchableOpacity>
          </>
        ) : userRole === 'admin' ? (
          <>
            <Text style={styles.title}>Admin Console</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserList')}>
              <FontAwesome name="plus" size={32} color="black" />
              <Text style={styles.buttonText}>เพิ่มบิลล์</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddUser')} >
              <FontAwesome name="user-plus" size={32} color="black" />
              <Text style={styles.buttonText}>เพิ่มผู้ใช้</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReportAdminList')}>
              <AntDesign name="exclamationcircle" size={32} color="black" />
              <Text style={styles.buttonText}>รายงานปัญหา</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

export default Home;
