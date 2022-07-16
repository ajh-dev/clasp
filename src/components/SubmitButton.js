import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
    Arvo_400Regular,
} from "@expo-google-fonts/arvo";

const SubmitButton = ({ onSubmit }) => {
    return (
        <TouchableOpacity style={styles.submitButton} onPress={() => onSubmit()}>
            <Text style={styles.submitText}>continue</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    submitText: {
        fontFamily: 'Arvo_400Regular',
        fontSize: 25
    },
    submitButton: {
        backgroundColor: '#AFBCEB',
        width: 200,
        alignSelf: 'center',
        marginTop: 50,
        alignItems: 'center',
        padding: 15,
        borderRadius: 15
    },
});

export default SubmitButton;