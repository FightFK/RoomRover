import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#007BFF" style={styles.spinner} />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5', // Optional: match your app's background
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    spinner: {
        // You can add some margin if needed
        marginBottom: 10,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 20, // Slightly larger font size
        fontWeight: 'bold', // Make text bold
        color: '#007BFF', // Change text color to match the spinner
    },
});

export default Loading;
