// Styles/Home-Screen.js
import { StyleSheet, Dimensions } from "react-native";

// Get the device width
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
  
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 10,
  },
  button: {
    backgroundColor: '#F0F0F0',
    width: (width - 40) / 3, // Adjusted width for 3 columns
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    marginTop: 5,
  },
});

export default styles;
