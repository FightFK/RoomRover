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
    marginTop:-20,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'column', // Change to column for vertical layout
    alignItems: 'center', // Center the buttons horizontally
    marginTop: 20,
    paddingHorizontal: 16, // Optional: Add padding for aesthetics
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    width: '100%', 
    marginTop:15,
    // Shadow for iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  // Shadow for Android
  elevation: 5,
  },
  buttonText: {
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5, // Adds shadow for Android
},
cardContent: {
    padding: 15,
},
headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
},
cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333', // Darker color for better readability
},
cardDescription: {
    fontSize: 16,
    color: '#555', // Softer color for description
    lineHeight: 22, // Increase line height for better spacing
},
editButton:{
  marginLeft: 180,
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
modalText: {
  marginBottom: 15,
  textAlign: "center",
  fontSize: 18,
  fontWeight: 'bold'
},
modalInput: {
  width: '100%',
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 10,
  paddingHorizontal: 10,
  marginBottom: 20
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
buttons: {
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
buttonClose: {
  backgroundColor: "#f44336",
},
buttonSave: {
  backgroundColor: "#4CAF50",
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
});

export default styles;
