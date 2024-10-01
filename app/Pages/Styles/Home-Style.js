import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0FE', // Light blue background
  },
  header: {
    backgroundColor: '#29B6F6', // Header background color
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  displayName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
  roomNumber: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#ff4757',
    borderRadius: 5,
    flexDirection: 'row',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical:0,
    color: '#333',
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Adjust this based on your layout preference
    paddingBottom: 60, // Optional: add some padding at the bottom
  },
  
  button: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    width: '95%',
    marginTop: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
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
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
  },
  editButton: {
    marginLeft: 'auto',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    elevation: 5,
    shadowColor: '#000',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttons: {
    borderRadius: 5,
    padding: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#ff4757',
  },
  buttonSave: {
    backgroundColor: '#3F8CFF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center', // Center the chart
    justifyContent: 'center',
    marginLeft: 7
  },
});

export default styles;
