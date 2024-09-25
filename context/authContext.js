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
          throw new Error("รหัสผ่านผิด");
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