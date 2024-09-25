// Styles/Home-Screen.js
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // จัดตำแหน่งให้ปุ่มล็อกเอาต์อยู่ทางขวา
  },  
  greetingContainer: {
    flexDirection: 'row', // จัดเรียงข้อความในแนวนอน
    alignItems: 'center', // จัดให้อยู่ตรงกลางในแนวดิ่ง
  },  
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight:10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#ff4757', // Change to your preferred color
    borderRadius: 5,
      flexDirection: 'row'
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
  banner: {
    width: '100%',
    height: 200, // Adjust based on your image
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'column', // Change to column for vertical layout
    alignItems: 'center', // Center the buttons horizontally
    marginTop: 20,
    paddingHorizontal: 16, // Optional: Add padding for aesthetics
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    width: '100%', // Adjust width to full for vertical buttons
    marginBottom: 16, // Space between buttons
  },
  buttonText: {
    marginTop: 8,
  },
});

export default styles;
