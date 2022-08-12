import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
    Arvo_400Regular,
  } from "@expo-google-fonts/arvo";

const MessageBox = ({ text, pressed }) => {
    if (pressed) {
        return (
            <View style={[styles.messageBox, styles.sent]}>
                <Text style={styles.text}>{text}</Text>
                <View style={styles.rightTail}/>
                <View style={styles.rightTailOverlap}/>
            </View>
        );
    } else {
        return (
            <View style={[styles.messageBox, styles.received]}>
                <View style={styles.leftTail}/>
                <View style={styles.leftTailOverlap}/>
                <Text style={styles.text}>{text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sent: {
        alignSelf: 'flex-end', 
        alignItems: 'flex-end',
        backgroundColor: 'tomato',
    },
    received: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        backgroundColor: '#ff9999'
    },
    messageBox: {
        height: 50,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
    },
    text: {
        fontFamily: "Arvo_400Regular",
        fontSize: 18,
        color: 'white',
        padding: 15
    },
    leftTail: {
        position: "absolute",
        backgroundColor: '#ff9999',
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },
    
    leftTailOverlap: {
        position: "absolute",
        backgroundColor: '#E9F4F9',
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20
    
    },
    rightTail: {
        position: 'absolute',
        backgroundColor: "tomato",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10
    },
    rightTailOverlap: {
        position: 'absolute',
        backgroundColor: '#E9F4F9',
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20
      
      },
})

export default MessageBox;