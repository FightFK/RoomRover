import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Added background color
        padding: 20,
    },
    imgholder: {
        alignItems: 'center',
        marginBottom: 20, // Adjust margin for spacing below the image
    },
    img: {
        width: 150, // Set width
        height: 150, // Set height
        borderRadius: 75, // Circular image
    },
    container: {
        width: '100%',
        alignItems: 'center', // Center the content in the container
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
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
        width: '100%', // Make input full width
    },
    button: {
        backgroundColor: '#29B6F6',
        paddingVertical: 15,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        width: '100%', // Make button full width
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16, // Font size for label
        fontWeight: 'bold', // Bold font for label
        color: '#333', // Color of text
        marginBottom: 8, // Margin below
    },
    logincontainer: {
        flexDirection: 'row',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16, // Spacing on top for better visibility
    },
    signupText: {
        fontSize: 16,
        color: 'gray', // Color for better visibility
    },
    signupLink: {
        fontSize: 16,
        color: '#1E90FF', // Link color
        fontWeight: 'bold',
        textDecorationLine: 'underline', // Underline for link indication
    },
});

export default styles;
