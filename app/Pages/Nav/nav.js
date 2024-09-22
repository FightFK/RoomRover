// BottomNavbar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BottomNavbar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <FontAwesome name="home" size={24} color="black" />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <FontAwesome name="building" size={24} color="black" />
        <Text>Dormitory</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <FontAwesome name="bell" size={24} color="black" />
        <Text>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <FontAwesome name="user" size={24} color="black" />
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  navItem: {
    alignItems: 'center',
  },
});

export default BottomNavbar;
