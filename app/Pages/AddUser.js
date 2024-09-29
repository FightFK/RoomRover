import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { db } from '../../config/firebase-config'; // Adjust path as necessary
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loading from './components/Loading'; // Import the Loading component

export default function AddUser() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(true); // Fixed state initialization

  // Fetch the current status from Firestore when the component mounts
  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true); // Set loading to true before fetching
      const statusDocRef = doc(db, 'status', 'statusregister'); // Adjust the path as necessary
      const statusDoc = await getDoc(statusDocRef);

      if (statusDoc.exists()) {
        setIsEnabled(statusDoc.data().status);
      } else {
        console.log('No such document!');
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchStatus();
  }, []);

  // Toggle the switch and update Firestore
  const toggleSwitch = async () => {
    const newValue = !isEnabled; // Toggle the current state
    setIsEnabled(newValue); // Update local state

    try {
      const statusDocRef = doc(db, 'status', 'statusregister'); // Adjust the path as necessary
      await setDoc(statusDocRef, { status: newValue }); // Update Firestore
      console.log("Firestore status updated to:", newValue);
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  if (loading) {
    return <Loading />; // Show Loading อุตส่าห์ทำ
  }

  return (
    <View style= {styles.Bigcontainer}> 
      <View style={styles.container}>
    <Text style={styles.label}>Enable Signup:</Text>
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  </View>
  </View>
   
  );
}

const styles = StyleSheet.create({
  Bigcontainer:{
    backgroundColor:'#F5F5F5'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor:'#FFF',
  },
  label: {
    fontSize: 16,
  },
});
