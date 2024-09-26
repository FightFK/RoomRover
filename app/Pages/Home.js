import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '../../context/authContext';
import { auth, db } from "../../config/firebase-config";
import { doc, getDoc } from 'firebase/firestore';  
import styles from './Styles/Home-Style';

function Home({ navigation }) {
  const authContext = useAuth();
  const [displayName, setDisplayName] = useState('User'); // Default display name
  const [userRole, setUserRole] = useState(''); // State to store user role

  const handleLogout = async () => {
    await authContext.logout();
    navigation.navigate('Login'); // Navigate to Login screen after logout
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (authContext.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', authContext.currentUser.uid));
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName); // Fetch displayName from Firestore
          setUserRole(userDoc.data().role); // Fetch user role from Firestore
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, [authContext.currentUser]); // Fetch data when currentUser changes

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello, </Text>
          <Text style={styles.email}>{displayName}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={15} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Top Banner */}
      <Image 
        source={require('../../assets/Room.png')} 
        style={styles.banner}
      />
      <View style= {styles.card}>
      <View style={styles.cardContent}>
                <View style={styles.headerContainer}>
                    <FontAwesome name="bell" size={24} color="#FFA500" />
                    <Text style={styles.cardTitle}>ข่าวสารวันนี้</Text>
                </View>
                <Text style={styles.cardDescription}> Test</Text>
        </View>
      </View>
       
     

      {/* Buttons Container (Vertical Layout) */}
      {userRole === 'user' && ( // Render buttons only if the user is a 'user'
        <View style={styles.buttonContainer}>
           <Text style={styles.title}>My Room</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bill')}>
            <FontAwesome name="file-text" size={32} color="black" />
            <Text style={styles.buttonText}>Bill Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('ReportList')} >
            <MaterialIcons name="report" size={32} color="black" />
            <Text style={styles.buttonText}>Report</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('News')}>
            <FontAwesome name="envelope" size={32} color="black" />
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>        */}
        </View>
      )}
      {userRole === 'admin' && (
        
         <View style={styles.buttonContainer}>
           <Text style={styles.title}>Admin Console</Text>
         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserList')}>
           <FontAwesome name="plus" size={32} color="black" />
           <Text style={styles.buttonText}>เพิ่มบิลล์</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} >
           <FontAwesome name="user-plus" size={32} color="black" />
           <Text style={styles.buttonText}>เพิ่มผู้ใช้</Text>
         </TouchableOpacity>
       </View>
      )}
    </SafeAreaView>
  );
}

export default Home;
