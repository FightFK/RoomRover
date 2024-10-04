# RoomRover

**RoomRover** เป็นแอปพลิเคชันมือถือที่พัฒนาขึ้นเพื่อระบบจัดการหอพัก รองรับทั้งสองฝ่าย ได้แก่ **User (ผู้เช่า)** และ **Admin (เจ้าของหอพัก)** เพื่อให้เจ้าของสามารถบริหารหอพักได้อย่างมีประสิทธิภาพ และให้ผู้เช่าสามารถจ่ายค่าเช่า หรือดูข้อมูลได้สะดวกยิ่งขึ้น

**หมายเหตุ :** แอปพลิเคชั่นนี้เป็นส่วนหนึ่งของโปรเจคในรายวิชา 344-312 Mobile Application Development



### เทคโนโลยีที่ใช้ในการพัฒนา

- **React Native**
- **Expo**
- **Firebase**

## ข้อกำหนดเบื้องต้น (Must Have)

- **Visual Studio Code**: [ติดตั้ง VS CODE](https://code.visualstudio.com/)
- **Node.js**: [ติดตั้ง Node.js](https://nodejs.org/)
- **Expo CLI**: ติดตั้ง Expo CLI globally
  ```bash
  npm install -g expo-cli
``




## Installation

 ```bash
  git clone https://github.com/FightFK/RoomRover.git
  ```
  เปลี่ยน  Directory ไปยังโปรเจ็ค
 ```bash
cd RoomRover
  ```

**ติดตั้ง Dependencies**
 ```bash
  npm install
  ```
**รันโปรเจค**
 ```bash
  npx expo start
```


## How To Development ( หากอยากพัฒนาตาม )

  1. สร้าง Project ของ Expo ด้วยคำสั่ง
 ```bash
npx create-expo-app@latest RoomRover
 ```
  จะได้  package หลักๆที่ใช้มา
 
  2. ติดตั้ง package ต่างๆที่สำคัญและต้องใช้ในการพัฒนาแอป
  **หลักๆจะเป็นพวก Firebase,Icon และอื่นๆที่ใช้ในการแสดงผล**
```bash
  npm install @expo/metro-runtime@~3.2.3 @expo/vector-icons@^14.0.3 @react-native-async-storage/async-storage@^1.24.0 @react-native-community/checkbox@^0.5.17 @react-navigation/bottom-tabs@^6.6.1 @react-navigation/native@^6.1.18 @react-navigation/native-stack@^6.11.0 expo@~51.0.28 expo-status-bar@~1.12.1 firebase@^10.13.2 ionicons@^7.4.0 react@18.2.0 react-dom@18.2.0 react-native@0.74.5 react-native-chart-kit@^6.12.0 react-native-dropdown-picker@^5.4.6 react-native-qrcode-svg@^6.3.2 react-native-safe-area-context@4.10.5 react-native-screens@3.31.1 react-native-svg@^15.7.1 react-native-vector-icons@^10.2.0 react-native-web@~0.19.10
```
3. จัดวางโฟลเดอร์แต่ละส่วนเพื่อให้พร้อมสำหรับการพัฒนา
```plaintext
RoomRover/
├── app/
│   ├── Pages/
│   │   ├── Bills/
│   │   └── Reports/
|   |   └── components/
|   |   └── Style/
│   ├── Route/
|   |   ├── index.js
│   │   └── bottomnavigator.js
│  
├── assets/
│   ├── images/
│   └── fonts/
├── config/
│   ├── firebase-config.js
│
├── context/
|   ├── authContext.js
├── .gitignore
├── package.json
└── README.md
```
4. เขียนโค้ดตามโค้ดใน Github Repo นี้ได้เลย

   **หมายเหตุ:**
   อธิบาย Code ใน Part ที่สำคัญต่อทั้งแอป
  ```plaintext
    
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './app/Pages/Home';  // Path to your Home component
import Routes from './app/routes';
import { AuthProvider } from './context/authContext';
export default function App() {
  return (
    
    <View style={styles.container}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

  ```
  โค้ดตรงส่วนนี้จะกำหนดการแสดงผลเริ่มต้นของหน้าเลย โดยเริ่มจาก AuthProvider เพื่อให้สามารถนำฟังก์ชันและข้อมูลต่างๆของ AuthContext ไปใช้ได้ในแต่ละหน้าภายใน Routes  จึงต้องมีการกำหนดตั้งแต่หน้านี้

  **Part Authenication**

 ส่วนของการ Sign Up  โค้ดนี้อยู่ใน ./context/authContext.js


  ```plaintext
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,updateProfile } from "firebase/auth";
import { auth,db } from "../config/firebase-config";
import { doc, setDoc } from 'firebase/firestore';   
const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ userLoggedIn, setUserLoggedIn ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    console.log("LoggedIn Status : ", userLoggedIn);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user);
                setUserLoggedIn(true);

            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUpWithEmail = async (email, password,roomNums,displayName, role = 'user') => {
        try {
            // สมัครผู้ใช้ใหม่
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Sign Up SoomBoonna");
            const user = userCredential.user;

            // เตรียมข้อมูลที่จะเก็บใน Firestore
            const userData = {
                uid: user.uid,
                displayName: displayName,
                email: user.email,
                roomNums: roomNums,
                role: role // กำหนด role (ค่าเริ่มต้นเป็น 'user')
            };
            console.log("เก็บข้อมูลแล้วนะ")
            console.log("UserId",user.uid,displayName,roomNums,user.email,role);
            // เก็บข้อมูลใน Firestore โดยใช้ UID เป็น document ID
            await setDoc(doc(db, 'users', user.uid), userData);
            
            console.log("User registered with display name:", displayName, "and role:", role);
    
        } catch (error) {
            console.error("Error during email registration:", error);
        }
    };
    
   // ล็อคอิน
    const signInWithEmail = async (email, password) => {
        try {
        await signInWithEmailAndPassword(auth, email, password);
    
        } catch (error) {
          // ส่งข้อผิดพลาดกลับไปยังที่เรียก
          throw new Error("อีเมลล์หรือรหัสผ่านผิด");
        }
      };
      


    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        signInWithEmail,
        signUpWithEmail,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
 ```
ในการสมัครสมาชิกจะระบบข้อมูลจากฟิลด์ในหน้า Sign Up แล้วมาใช้ระบบของ Firebase ที่มีอยู่แล้วภายใน แต่โดยปกติระบบ Authenication ของ Firebase จะไม่สามารถดึงข้อมูลออกมาใช้ได้ง่ายๆ ตามหลักความปลอดภัยดังนั้นเราจึงต้อง นำข้อมูลที่จะเข้า ฟังก์ชันสมัครสมาชิก มาเก็บไว้ในตัวแปรและเอาไปเก็บใน Firestore ด้วยเพื่อที่จะเอา ข้อมูลเหล่า users ไปใช้ต่อได้ในหน้าถัดๆไป


**ส่วนของ hande signup โค้ดนี้อยู่ใน ./Pages/Register.js**
   ```plaintext
const handleSignup = async () => {
        if (!isSignupEnabled) {
            setAlertMessage("กรุณาติดต่อเจ้าของหอเพื่อเปิดระบบสมัครสมาชิก");
            setAlertVisible(true);
            return;
        }

        if (!email || !password || !confirmPassword || !displayName) {
            setAlertMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
            setAlertVisible(true);
            return;
        }

        if (!isValidEmail(email)) {
            setAlertMessage("กรุณากรอกอีเมลที่ถูกต้อง");
            setAlertVisible(true);
            return;
        }

        if (password.length < 6) {
            setAlertMessage("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
            setAlertVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setAlertMessage("รหัสผ่านไม่ตรงกัน");
            setAlertVisible(true);
            return;
        }
        setError('');
        try {
            await auth.signUpWithEmail(email, password, roomNums, displayName, 'user');

            navigation.navigate('Login');
        } catch (e) {
            setError('Email ของคุณมีคนใช้งานอยู่แล้ว')
        }
    };
 ```

 ส่วนของ Handle Signup ที่จะรับค่าต่างๆจาก User มาเพื่อตรวจสอบก่อนที่จะเข้าสู่ฟังก์ชันสมัครสมาชิกของ Firebase

 **ส่วนของการ Routes**
 โค้ดนี้อยู่ใน ./app/Pages/Routes/index.js
  ```plaintext
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
 ```


5. ทดลอง **รันโปรเจค**
 ```bash
  npx expo start
```
## Documentation

 - [React Native](https://reactnative.dev/)
 - [Expo Dev](https://docs.expo.dev/)


