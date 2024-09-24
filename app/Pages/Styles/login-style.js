// Styles/Home-Screen.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      imgholder: {
        alignItems: 'center',
        marginTop:-150,
      },
      img: {
        width: 150, // กำหนดความกว้าง
        height: 150, // กำหนดความสูง
        borderRadius: 75, // ให้เป็นรูปกลม

      },
      container: {
        width: '100%',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop:10,
        marginBottom: 20,
        textAlign: 'center',
    
      },
      subHeader: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
      },
      input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#29B6F6',
        paddingVertical: 15,
        marginLeft:30,
        marginRight:30,
        borderRadius: 10,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
      },
      label: {
        fontSize: 16, // ขนาดตัวอักษร
        fontWeight: 'bold', // ทำให้ตัวอักษรหนา
        color: '#333', // สีของข้อความ
        marginBottom: 8, // ระยะห่างด้านล่าง
      },
      logincontainer:{
        flexDirection: 'row',
      },
      signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16, // Add some margin on top for spacing
      },
      signupText: {
        fontSize: 16,
        color: 'gray', // Change color for better visibility
      },
      signupLink: {
        fontSize: 16,
        color: '#1E90FF', // Change link color to blue
        fontWeight: 'bold',
        textDecorationLine: 'underline', // Underline to indicate it's a link
      },
    
});

export default styles;
