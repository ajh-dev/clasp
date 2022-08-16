import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";
import NavigationBar from "../components/NavigationBar";
import ConversationPreview from "../components/ConversationPreview";
import { Context as messageContext } from "../context/messageContext";
import { Context as userContext } from "../context/userContext";
import { io } from "socket.io-client";

function Home({ navigation }) {
  const messageBackend = useContext(messageContext);
  const userBackend = useContext(userContext);
  const [isConversationCreate, setIsConversationCreate] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isListener, setIsListener] = useState(true);

  const socket = useRef();
  const flatRef = useRef();

  const resetMessageList = () => {
    flatRef.current.scrollToEnd({
      animated: true,
    });
  };

  useEffect(() => {
    if (userBackend.state.token) {
      socket.current = io("http://192.168.0.132:4000");
      socket.current.emit("add-user-conversation", userBackend.state.token);
      messageBackend.loadConversations();
      setFirstLoad(false);
    }
  }, [userBackend.state.token]);

  useEffect(() => {
    if (
      isConversationCreate &&
      !firstLoad &&
      messageBackend.state.conversations.length > 0
    ) {
      socket.current.emit("add-conversation", {
        self: userBackend.state.token,
        conversation:
          messageBackend.state.conversations[
            messageBackend.state.conversations.length - 1
          ],
      });
      setIsConversationCreate(false);
    }
  }, [messageBackend.state.conversations]);

  useEffect(() => {
    if (isListener && socket.current) {
      socket.current.on("conversation-receive", (newConversation) => {
        messageBackend.addConversation(newConversation);
      });
      setIsListener(false);
    }
  }, [socket.current]);
  return userBackend.state.token ? (
    <View style={styles.container}>
      <Text style={styles.header}>messages</Text>
      <View style={styles.messagesContainer}>
        {messageBackend.state.conversations.length > 0 ? (
          <FlatList
            onContentSizeChange={resetMessageList}
            ref={flatRef}
            data={messageBackend.state.conversations}
            renderItem={({ item }) => (
              <ConversationPreview
                navigation={navigation}
                getUser={() => userBackend.getUserByID(item.users[1]._id)}
                recentMessage={
                  item.messages.length
                    ? item.messages[0].message
                    : "No messages yet"
                }
                conversationID={item._id}
              />
            )}
          />
        ) : (
          <View>
            <Text style={styles.subHeader}>no conversations</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#61B4E6" }]}
        onPress={() => navigation.navigate("UserDataList")}
      >
        <Text style={styles.buttonText}>user-reported data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#ECD0FF" }]}>
        <Text style={styles.buttonText}>events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#7BD2F1" }]}>
        <Text style={styles.buttonText}>suggested resources</Text>
      </TouchableOpacity>
      <NavigationBar
        isHome={false}
        navigation={navigation}
        createConversation={() => {
          messageBackend.createConversation();
          setIsConversationCreate(true);
        }}
      />
    </View>
  ) : (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="tomato" />
      {console.log(userBackend.state)}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    width: 300,
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    top: 150,
  },
  buttonText: {
    fontFamily: "Arvo_400Regular",
    fontSize: 25,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    fontFamily: "Arvo_400Regular",
    fontSize: 40,
    marginTop: 70,
    left: 50,
    position: "absolute",
  },
  subHeader: {
    fontFamily: "Arvo_400Regular",
    fontSize: 25,
    alignSelf: "center",
  },
  messagesContainer: {
    width: "75%",
    height: 220,
    top: 130,
    justifyContent: "center",
  },
});

export default Home;
