import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,ActivityIndicator , TextInput  } from 'react-native';

export default function ReportList({ navigation }) {


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>รายงานปัญหา</Text>
            <TouchableOpacity style={styles.reportItem} onPress={() => navigation.navigate('ReportEdit')}>
                <Text style={styles.reportText}>ห้อง : </Text>
                <Text style={styles.reportText}>ปัญหา : </Text>
                <Text style={styles.reportText}>สถานะ : </Text>
                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsHeader}>ความคิดเห็นจากแอดมิน :</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportItem} onPress={() => navigation.navigate('ReportEdit')}>
                <Text style={styles.reportText}>ห้อง : </Text>
                <Text style={styles.reportText}>ปัญหา : </Text>
                <Text style={styles.reportText}>สถานะ : </Text>
                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsHeader}>ความคิดเห็นจากแอดมิน :</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reportItem} onPress={() => navigation.navigate('ReportEdit')}>
                <Text style={styles.reportText}>ห้อง : </Text>
                <Text style={styles.reportText}>ปัญหา : </Text>
                <Text style={styles.reportText}>สถานะ : </Text>
                <View style={styles.commentsContainer}>
                    <Text style={styles.commentsHeader}>ความคิดเห็นจากแอดมิน :</Text>
                </View>
            </TouchableOpacity>
        </View>
        
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    headerText:{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    reportItem: {
        backgroundColor:'#FFF',
        padding: 20,
        borderWidth: 5, // Set a border width
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    reportText: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5
    },
    commentsContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    commentsHeader: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    flatListContent: {
        paddingBottom: 20,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 24,
        lineHeight: 24,
    },
});
