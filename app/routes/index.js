import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Getstart from '../Pages/Getstart'
import Login from '../Pages/login';
import Register from '../Pages/register';
import Home from '../Pages/Home';
import Bill from '../Pages/Bills/Bill';
import Billinfo from '../Pages/Bills/Billinfo';
import News from '../Pages/News';
import BillAdd from '../Pages/Bills/BillAdd';
import UserList from '../Pages/UserList';
import BillList from '../Pages/Bills/BillList';
import ReportList from '../Pages/Reports/ReportList';
import ReportAdd from '../Pages/Reports/ReportAdd';
const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Getstart" component={Getstart} options={{
                    headerShown: false
            }}/>
            <Stack.Screen name="Login" component={Login} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="SignUp" component={Register} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="Home" component={Home} options={{
                headerShown: false
            }}/>
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
                    backgroundColor: '#29B6F6'
                },
                headerTintColor: '#fff',
            }}/>
            <Stack.Screen name="ReportAdd" component={ReportAdd} options={{
                headerTitle: 'RoomRover',
                headerBackTitle: 'กลับ',
                headerStyle: {
                    backgroundColor: '#29B6F6'
                },
                headerTintColor: '#fff',
            }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes