import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, FlatList, KeyboardAvoidingView } from "react-native";
import {
    Arvo_400Regular,
  } from "@expo-google-fonts/arvo"; 
import { Feather } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import MessageBox from '../components/MessageBox';
  
const Message = ({ navigation }) => {
    const [curText, setCurText] = useState({message: "", sender: "me"})
    const [convoTexts, setConvoTexts] = useState([]);

    const sendMessage = () => {
        setConvoTexts([...convoTexts, curText]);
        setCurText({message: "", sender: "you"});
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <BackButton navigation={ navigation }/>
                <Text style={styles.header}>Adam Hollander</Text>
                <Text style={styles.subHeader}>a fellow cancer patient</Text>
                <Image style={styles.image} source={require('../../assets/blank-profile.png')} />
            </View>
            <FlatList
                data={convoTexts}
                renderItem={({item}) => <MessageBox text={item.message} pressed={item.sender === "me"}/>}
                contentContainerStyle={styles.messages}
                inverted
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.messageBar}>
                    <TextInput 
                        style={styles.inputBar}
                        onChangeText={newText => setCurText({...curText, message: newText})}
                        value={curText.message}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage()}>
                        <Feather name="corner-right-up" size={35} color="black" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
  }

const styles = StyleSheet.create({
    messages: {
        flexDirection: 'column-reverse'
    },
    inputBar: {
        height: 35,
        marginLeft: 15,
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 28,
        padding: 10,
        fontFamily: "Arvo_400Regular",
        flex: 5
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
        paddingVertical: 10,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    sendButton: {
        backgroundColor: 'tomato',
        borderRadius: 17.5,
        marginRight: 20,
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