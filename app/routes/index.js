import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Getstart from '../Pages/Getstart';
import Login from '../Pages/login';
import Register from '../Pages/register';
import BottomNavigator from './bottomnavigator';  // Import your BottomNavigator
import AddUser from '../Pages/AddUser';
import Billinfo from '../Pages/Bills/Billinfo';
import News from '../Pages/News';
import Bill from '../Pages/Bills/Bill';
import ReportList from '../Pages/Reports/ReportList';
import BillAdd from '../Pages/Bills/BillAdd';
import UserList from '../Pages/Bills/UserList';
import BillList from '../Pages/Bills/BillList';
import EditBills from '../Pages/Bills/EditBills';
import ReportAdd from '../Pages/Reports/ReportAdd';
import ReportEdit from '../Pages/Reports/ReportEdit';
import ReportAdminList from '../Pages/Reports/ReportAdminList';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Getstart" component={Getstart} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="SignUp" component={Register} options={{ headerShown: false }}/>

                {/* Use BottomNavigator instead of Home to show tabs in Home */}
                <Stack.Screen name="Home" component={BottomNavigator} options={{ headerShown: false }}/>


                <Stack.Screen name="Bill" component={Bill} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6'
                },
                headerTintColor: '#fff',
            }}/>
            <Stack.Screen name="Billinfo" component={Billinfo} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6'
                },
                headerTintColor: '#fff',
            }}/>
                <Stack.Screen name="News" component={News} options={{
                    headerTitle: 'RoomRover',
                    headerBackTitle: 'กลับ',
                    headerStyle: {
                        backgroundColor: '#29B6F6'
                    },
                    headerTintColor: '#fff',
            }}/>
            <Stack.Screen name="BillAdd" component={BillAdd} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6'
                },
                headerTintColor: '#fff',
            }}/>
            <Stack.Screen name="UserList" component={UserList} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6'
                },
                headerTintColor: '#fff',
            }}/>
            <Stack.Screen name="BillList" component={BillList} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6'
                },
                headerTintColor: '#fff',
            }}/>
            <Stack.Screen name="ReportList" component={ReportList} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6',
                    backgroundColor: '#29B6F6',
                    backgroundColor: '#29B6F6',
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                },
                headerTintColor: '#fff',
            }}/>
            <Stack.Screen name="ReportAdd" component={ReportAdd} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6',
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                },
                headerTintColor: '#fff',
            }}/>
            <Stack.Screen name="EditBills" component={EditBills} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6'
                },
                headerTintColor: '#fff',
            }}/>
            <Stack.Screen name="ReportEdit" component={ReportEdit} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6',
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                },
                headerTintColor: '#fff',
            }}/>
            <Stack.Screen name="ReportAdminList" component={ReportAdminList} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6',
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                },
                headerTintColor: '#fff',
            }}/>

            <Stack.Screen name="AddUser" component={AddUser} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6'
                },
                headerTintColor: '#fff',
            }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;