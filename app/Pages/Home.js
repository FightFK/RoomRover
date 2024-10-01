import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, Dimensions } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '../../context/authContext';
import { auth, db } from "../../config/firebase-config";
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';  
import styles from './Styles/Home-Style';
import { BarChart } from "react-native-chart-kit"; 

function Home({ navigation }) {
  const authContext = useAuth();
  const [displayName, setDisplayName] = useState('User'); 
  const [roomNums, setRoomNums] = useState(''); 
  const [userRole, setUserRole] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [announcement, setAnnouncement] = useState("ไม่มีประกาศ");
  const [monthlyElectricityUsage, setMonthlyElectricityUsage] = useState([]); // State for electricity usage data

  // Get the last 6 months of data
  const lastSixMonthsLabels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // Last 6 month labels

  const handleLogout = async () => {
    try {
      await authContext?.logout();  
      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Logout error: ', error); 
    }
  };

  // Fetch User and Announcement Data
  useEffect(() => {
    const fetchUserData = async () => {
      if (authContext.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', authContext?.currentUser?.uid));
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName); 
          setRoomNums(userDoc.data().roomNums);
          setUserRole(userDoc.data().role); 
        } else {
          console.log("No such document!");
        }
      }
    };

    const fetchAnnouncement = async () => {
      const announcementDoc = await getDoc(doc(db, 'announcement', 'latest'));
    
      if (announcementDoc.exists()) {
        setAnnouncement(announcementDoc.data().text); 
      }
    };

    // Fetch electricity usage data
    const fetchElectricityUsage = async () => {
      if (authContext?.currentUser) {
        const billsRef = collection(db, 'bills', authContext.currentUser.uid, 'userBills');
        const querySnapshot = await getDocs(billsRef);
        const usageData = [];

        querySnapshot.forEach((doc) => {
          usageData.push(doc.data().priceElectric); // Assuming `priceElectric` is the field with the electricity usage
        });

        // Take the last 6 months of usage data
        const lastSixMonthsUsage = usageData.slice(-6);
        setMonthlyElectricityUsage(lastSixMonthsUsage);
      }
    };

    fetchUserData();
    fetchAnnouncement();  
    fetchElectricityUsage(); // Fetch electricity usage data
  }, [authContext?.currentUser]);

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
    setModalVisible(false); 
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
                onPress={() => setModalVisible(true)} 
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
              onPress={handleSaveAnnouncement}
            >
              <Text style={styles.textStyle}>บันทึก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Scrollable Buttons Container */}
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {userRole === 'user' ? (
          <>
            {/* Center the Bar Chart */}
            <View style={styles.chartContainer}>
              <Text>ค่าไฟฟ้าย้อนหลัง 6 เดือน</Text>
              <BarChart
                data={{
                  labels: lastSixMonthsLabels, // Last 6 month labels
                  datasets: [
                    {
                      data: monthlyElectricityUsage.length > 0 ? monthlyElectricityUsage : [0, 0, 0, 0, 0, 0], // Fallback to zeros if no data
                      color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`, // ใช้สีฟ้าเข้ม
                      strokeWidth: 2, // optional
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 16} // Adjust the width a bit wider
                height={220}
                chartConfig={{
                  backgroundColor: "#ffffff", // เปลี่ยนพื้นหลังให้ขาว
                  backgroundGradientFrom: "#ffffff", // พื้นหลังขาว
                  backgroundGradientTo: "#f0f0f0", // พื้นหลังอ่อน
                  decimalPlaces: 2, // optional
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // สีตัวอักษรเป็นสีดำ
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                    paddingLeft: 30, // เพิ่ม padding ด้านซ้าย
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#4682b4", // ใช้สีฟ้าเข้มสำหรับจุด
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  marginLeft: -8, // เพิ่ม marginLeft ให้ลดชิดด้านขวาลง
                }}
              />
            </View>
          </>
        ) : userRole === 'admin' ? (
          <>
            <Text style={styles.title}>Admin Console</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserList')}>
              <FontAwesome name="plus" size={32} color="black" />
              <Text style={styles.buttonText}>จัดการบิลล์</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddUser')} >
              <FontAwesome name="user-plus" size={32} color="black" />
              <Text style={styles.buttonText}>จัดการผู้ใช้</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReportAdminList')}>
              <AntDesign name="exclamationcircle" size={32} color="black" />
              <Text style={styles.buttonText}>ดูรายงานปัญหา</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
