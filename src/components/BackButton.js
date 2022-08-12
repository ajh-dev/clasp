import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
    Arvo_400Regular,
  } from "@expo-google-fonts/arvo";
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({ navigation }) => {
    return (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        left: 15,
        top: 35
    }
})

export default BackButton;