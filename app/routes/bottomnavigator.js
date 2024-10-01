import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons
import Home from '../Pages/Home';
import Bill from '../Pages/Bills/Bill';
import Report from '../Pages/Reports/ReportList';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size, color }) => {
          let iconComponent;

          if (route.name === 'HomeTab') {
            iconComponent = <Ionicons name="home" size={size} color="black" />;
          } else if (route.name === 'BillTab') {
            iconComponent = <FontAwesome name="file-text" size={size} color="black" />; // Use FontAwesome for Bill
          } else if (route.name === 'ReportTab') {
            iconComponent = <MaterialIcons name="report" size={size} color="black" />; // Use MaterialIcons for Report
          }
          
          return iconComponent; // Return the icon component
        },
        tabBarActiveTintColor: '#000w2   ',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarLabelStyle: { fontSize: 14 }, // Adjust font size here
        tabBarStyle: { 
          height: 60, // Adjust height of the tab bar
          paddingBottom: 5, // Add padding at the bottom
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={Home}  
        options={{ 
          title: 'หน้าแรก' ,
          headerStyle: {
            backgroundColor: '#29B6F6'
          },
          headerTintColor: '#fff',
        }} 
      />
      <Tab.Screen 
        name="BillTab" 
        component={Bill} 
        options={{
          title: 'บิล',
          headerShown: true,
          headerTitle: 'RoomRover',
          headerBackTitle: 'กลับ',
          headerStyle: {
            backgroundColor: '#29B6F6'
          },
          headerTintColor: '#fff',
        }} 
      />
      <Tab.Screen 
        name="ReportTab" 
        component={Report}  
        options={{
          title: 'รายงาน',
          headerShown: true,
          headerTitle: 'RoomRover',
          headerBackTitle: 'กลับ',
          headerStyle: {
            backgroundColor: '#29B6F6',
            
          },
          headerTintColor: '#fff',
        }} 
      />
    </Tab.Navigator>
  );
}
