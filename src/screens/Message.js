import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
    Arvo_400Regular,
  } from "@expo-google-fonts/arvo"; 
import { Feather } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import MessageBox from '../components/MessageBox';
  
const Message = ({ navigation }) => {

    const [text, setText] = useState('');
    const [wasPressed, setWasPressed] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <BackButton navigation={ navigation }/>
                <Text style={styles.header}>Adam Hollander</Text>
                <Text style={styles.subHeader}>a fellow cancer patient</Text>
                <Image style={styles.image} source={require('../../assets/blank-profile.png')} />
            </View>
            {wasPressed && <MessageBox text={text} pressed={wasPressed}/>}
            <View style={styles.messageBar}>
                <TextInput 
                style={styles.inputBar}
                onChangeText={newText => setText(newText)}
                defaultValue={text}
                />
                <TouchableOpacity style={styles.sendButton} onPress={() => setWasPressed(!wasPressed)}>
                    <Feather name="corner-right-up" size={35} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
  }

const styles = StyleSheet.create({
    inputBar: {
        width: 300,
        height: 35,
        marginRight: 25,
        backgroundColor: 'white',
        borderRadius: 28,
        padding: 10,
        fontFamily: "Arvo_400Regular",
    },
    container: {
        flex: 1,
        backgroundColor: '#E9F4F9',
    },
    header: {
        fontFamily: "Arvo_400Regular",
        fontSize: 25,
        position: 'absolute',
        left: 70
    },
    headerBar: {
        backgroundColor: '#F5F5F5',
        height: 150,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    image: {
        width: 75,
        height: 75,
        position: 'absolute',
        bottom: 15,
        right: 30
    },
    messageBar: {
        backgroundColor: '#E0E0E0',
        width: '100%',
        height: 110,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendButton: {
        backgroundColor: 'tomato',
        borderRadius: 17.5,
        right: 20,
        position: 'absolute'
    },
    subHeader: {
      fontFamily: "Arvo_400Regular",
      fontSize: 15,
      position: 'absolute',
      left: 70,
      top: 95,
      color: 'gray'
    }
})
  
export default Message;