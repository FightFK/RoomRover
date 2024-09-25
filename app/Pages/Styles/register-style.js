import { StyleSheet } from "react-native";
// Example styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#888888',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 45,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#2B4BF2',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 18,
    },
    signupContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        color: '#888888',
    },
    signupLink: {
        color: '#2B4BF2',
        fontWeight: 'bold',
    },
});
