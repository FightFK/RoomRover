import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { db } from '../../config/firebase-config'; // Adjust path as necessary
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AddUser() {
  const [isEnabled, setIsEnabled] = useState(false);

  // Fetch the current status from Firestore when the component mounts
  useEffect(() => {
    const fetchStatus = async () => {
      const statusDocRef = doc(db, 'status', 'statusregister'); // Adjust the path as necessary
      const statusDoc = await getDoc(statusDocRef);

      if (statusDoc.exists()) {
        setIsEnabled(statusDoc.data().status);
      } else {
        console.log('No such document!');
      }
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

  return (
    <View style={styles.container}>
  
      <Text style={styles.label}>Enable Signup:</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  label: {
    fontSize: 16,
  },
});