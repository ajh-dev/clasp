import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";
import { Feather } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import MessageBox from "../components/MessageBox";
import { Context as messageContext } from "../context/messageContext";
import { Context as userContext } from "../context/userContext";
import { io } from "socket.io-client";

const Message = ({ navigation, route }) => {
  const messageBackend = useContext(messageContext);
  const userBackend = useContext(userContext);
  const [curText, setCurText] = useState("");
  const [convoTexts, setConvoTexts] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isListener, setIsListener] = useState(true);
  const [isMessageCreate, setIsMessageCreate] = useState(false);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://192.168.0.132:4000");
    socket.current.emit("add-user-message", userBackend.state.token);
    messageBackend.loadConversation(route.params.conversationID);
    setIsFirstLoad(false);
  }, []);

  useEffect(() => {
    if (curText === "" && !isFirstLoad) {
      setCurText({
        message: "",
        sender: userBackend.state.token,
        receiver: messageBackend.state.curConvo.other,
      });
    }
  }, [messageBackend.state.curConvo]);

  useEffect(() => {
    if (
      !isFirstLoad &&
      messageBackend.state.curConvo.conversation.messages.length > 0 &&
      messageBackend.state.curConvo.conversation.messages[
        messageBackend.state.curConvo.conversation.messages.length - 1
      ].sender !== messageBackend.state.curConvo.other &&
      isMessageCreate
    ) {
      socket.current.emit(
        "new-message",
        messageBackend.state.curConvo.conversation.messages[
          messageBackend.state.curConvo.conversation.messages.length - 1
        ]
      );
      setIsMessageCreate(false);
    }
  }, [isMessageCreate]);

  useEffect(() => {
    if (isListener && socket.current) {
      socket.current.on("message-receive", (newMessage) => {
        messageBackend.addMessage(newMessage);
      });
      setIsListener(false);
    }
  }, [socket.current]);

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <BackButton navigation={navigation} />
        <Text style={styles.header}>{route.params.name}</Text>
        <Text style={styles.subHeader}>
          a fellow {route.params.condition} patient
        </Text>
        <Image
          style={styles.image}
          source={require("../../assets/blank-profile.png")}
        />
      </View>
      {Object.keys(messageBackend.state.curConvo).length > 0 ? (
        <FlatList
          data={messageBackend.state.curConvo.conversation.messages}
          renderItem={({ item }) => (
            <MessageBox
              text={item.message}
              pressed={item.sender !== messageBackend.state.curConvo.other}
            />
          )}
          contentContainerStyle={styles.messages}
          inverted
        />
      ) : null}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.messageBar}>
          <TextInput
            style={styles.inputBar}
            onChangeText={(newText) =>
              setCurText({ ...curText, message: newText })
            }
            value={curText.message}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              messageBackend.sendMessage(curText, route.params.conversationID);
              setIsMessageCreate(true);
              setCurText({
                message: "",
                sender: userBackend.state.token,
                receiver: messageBackend.state.curConvo.other,
              });
            }}
          >
            <Feather name="corner-right-up" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  messages: {
    flexDirection: "column-reverse",
  },
  inputBar: {
    height: 35,
    marginLeft: 15,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 28,
    padding: 10,
    fontFamily: "Arvo_400Regular",
    flex: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#E9F4F9",
  },
  header: {
    fontFamily: "Arvo_400Regular",
    fontSize: 25,
    position: "absolute",
    left: 70,
  },
  headerBar: {
    backgroundColor: "#F5F5F5",
    height: 150,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 75,
    height: 75,
    position: "absolute",
    bottom: 15,
    right: 30,
  },
  messageBar: {
    backgroundColor: "#E0E0E0",
    width: "100%",
    paddingVertical: 10,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  sendButton: {
    backgroundColor: "tomato",
    borderRadius: 17.5,
    marginRight: 20,
  },
  subHeader: {
    fontFamily: "Arvo_400Regular",
    fontSize: 15,
    position: "absolute",
    left: 70,
    top: 95,
    color: "gray",
  },
});

export default Message;
