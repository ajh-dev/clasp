import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Arvo_400Regular,
} from "@expo-google-fonts/arvo";
import UserInput from '../components/UserInput';
import SubmitButton from '../components/SubmitButton';

const SignupID = ({ navigation }) => {
    const userID = (Math.random() + 1).toString(36).substring(7);
    const [healthCondition, setHealthCondition] = useState('');

    const healthConditions = [
        {label: 'cancer', value: 'cancer'},
        {label: 'diabetes', value: 'diabetes'}
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{"Here's all you\nneed to login!"}</Text>
            <Text style={styles.subheader}>user ID: {userID}</Text>
            <View style={styles.dropdown}>
                <UserInput
                    inputName='condition'
                    onInputChange={newInput => setHealthCondition(newInput)}
                    type='dropdown'
                    optionalStatus={''}
                    pickerOptions={healthConditions}
                    curPicker={healthCondition}
                />
            </View>
            <SubmitButton />
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown:{
        marginVertical: 100
    },
    subheader:{
        fontFamily: 'Arvo_400Regular',
        marginTop: 50,
        fontSize: 20
    },
    container: {
        backgroundColor: '#A9E8E9',
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Arvo_400Regular',
        marginTop: 125,
        fontSize: 30
    }
});

export default SignupID;