import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Getstart from '../Pages/Getstart'
import Login from '../Pages/login';
import Register from '../Pages/register';
import Home from '../Pages/Home';
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes