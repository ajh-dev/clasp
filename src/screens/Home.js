import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";
import NavigationBar from "../components/NavigationBar";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>messages</Text>
      <View style={styles.messagesContainer}>
        <ScrollView>
          <View style={styles.message}>
            <View style={styles.horizontalLine} />
            <Text style={styles.messageHeader}>Adam Hollander</Text>
            <Text style={styles.messageText}>Hello</Text>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.message}>
            <View style={styles.horizontalLine} />
            <Text style={styles.messageHeader}>Adam Hollander</Text>
            <Text style={styles.messageText}>Hello</Text>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.message}>
            <View style={styles.horizontalLine} />
            <Text style={styles.messageHeader}>Adam Hollander</Text>
            <Text style={styles.messageText}>Hello</Text>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.message}>
            <View style={styles.horizontalLine} />
            <Text style={styles.messageHeader}>Adam Hollander</Text>
            <Text style={styles.messageText}>Hello</Text>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.message}>
            <View style={styles.horizontalLine} />
            <Text style={styles.messageHeader}>Adam Hollander</Text>
            <Text style={styles.messageText}>Hello</Text>
            <View style={styles.horizontalLine} />
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#61B4E6" }]}>
        <Text style={styles.buttonText}>user-reported data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#ECD0FF" }]}>
        <Text style={styles.buttonText}>events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#7BD2F1" }]}>
        <Text style={styles.buttonText}>suggested resources</Text>
      </TouchableOpacity>
      <NavigationBar navigation={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  message: {
    marginTop: 10,
  },
  messagesContainer: {
    width: "75%",
    height: 220,
    top: 130,
  },
  messageHeader: {
    fontFamily: "Arvo_400Regular",
    fontSize: 15,
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 10,
  },
  messageText: {
    fontFamily: "Arvo_400Regular",
    fontSize: 12,
    marginLeft: 35,
    marginBottom: 10,
  },
  horizontalLine: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
});

export default Home;
