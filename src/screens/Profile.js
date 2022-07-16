import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
    Arvo_400Regular,
  } from "@expo-google-fonts/arvo";

const Profile = ({ navigation }) => {
    const [nameDisabled, setNameDisabled] = useState(false);
    const [conditionDisabled, setConditionDisabled] = useState(false);
    const [locationDisabled, setLocationDisabled] = useState(false);
    const [emailDisabled, setEmailDisabled] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <Image style={styles.image} source={require('../../assets/blank-profile.png')} />
            <View style={styles.fieldsContainer}>
                <Text style={styles.fields}>name: {nameDisabled ? 
                    <Text style={styles.disabledText}><Text style={styles.asterisk}>*</Text>Disabled</Text> : 
                    <Text style={styles.fields}>Joe Shmo</Text>}
                </Text>
                <TouchableOpacity onPress={() => { setNameDisabled(nameDisabled ? false : true)}}>
                    <Image style={styles.disableButton} source={require('../../assets/close-icon.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.fieldsContainer}>
                <Text style={styles.fields}>health condition(s): {conditionDisabled ?
                    <Text style={styles.disabledText}><Text style={styles.asterisk}>*</Text>Disabled</Text> : 
                    <Text style={styles.fields}>cancer</Text>}
                </Text>
                <TouchableOpacity onPress={() => { setConditionDisabled(conditionDisabled ? false : true)}}>
                    <Image style={styles.disableButton} source={require('../../assets/close-icon.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.fieldsContainer}>
                <Text style={styles.fields}>location: {locationDisabled ?
                    <Text style={styles.disabledText}><Text style={styles.asterisk}>*</Text>Disabled</Text> : 
                    <Text style={styles.fields}>New Jersey</Text>}
                </Text>
                <TouchableOpacity onPress={() => { setLocationDisabled(locationDisabled ? false : true)}}>
                    <Image style={styles.disableButton} source={require('../../assets/close-icon.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.fieldsContainer}>
                <Text style={styles.fields}>email: {emailDisabled ?
                    <Text style={styles.disabledText}><Text style={styles.asterisk}>*</Text>Disabled</Text> : 
                    <Text style={styles.fields}>joeshmo@gmail.com</Text>}
                </Text>
                <TouchableOpacity onPress={() => { setEmailDisabled(emailDisabled ? false : true)}}>
                    <Image style={styles.disableButton} source={require('../../assets/close-icon.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    asterisk: {
        fontFamily: "Arvo_400Regular",
        fontSize: 25,
        color: "#FFCA03",
        lineHeight: 18
    },
    container: {
        flex: 1,
        backgroundColor: '#C4D7E0',
    },
    disabledText: {
        fontFamily: "Arvo_400Regular",
        fontSize: 25,
        color: "#FFCA03"
    },
    fields: {
        fontFamily: "Arvo_400Regular",
        fontSize: 25,
    },
    header: {
        fontFamily: "Arvo_400Regular",
        fontSize: 50,
        marginTop: 100,
        marginLeft: 50
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: 50,
        marginTop: 25
    },
    disableButton: {
        width: 25,
        height: 25,
        marginLeft: 10
    },
    fieldsContainer: {
        marginLeft: 50,
        marginTop: 20,
        flexDirection: "row",
        alignItems: 'center'
    }
})

export default Profile;