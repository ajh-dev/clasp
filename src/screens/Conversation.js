import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { io } from "socket.io-client";
import { ENDPOINT } from "../api/ENDPOINT";
import { Context as MessageContext } from "../context/messageContext";

const Conversation = ({ navigation }) => {
  const [message, setMessage] = useState({
    message: "",
    sender: "",
    receiver: "",
    timestamp: "",
  });
  const [conversation, setConversation] = useState([]);

  const messageContext = useContext(MessageContext);

  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.centertest}>Hello there</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centertest: {
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default Conversation;
