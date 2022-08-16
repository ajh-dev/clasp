import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const NavigationBar = ({ navigation, createConversation, isHome }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.text}>profile</Text>
      </TouchableOpacity>
      <View style={styles.verticalLine} />
      {isHome ? (
        <TouchableOpacity
          style={styles.centralIcon}
          onPress={() => navigation.navigate("Home")}
        >
          <AntDesign name="home" size={60} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.centralIcon}
          onPress={() => createConversation()}
        >
          <AntDesign name="message1" size={60} color="black" />
        </TouchableOpacity>
      )}
      <View style={styles.verticalLine} />
      <TouchableOpacity>
        <Text style={styles.text}>my feed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DAEAF1",
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  centralIcon: {
    backgroundColor: "tomato",
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  text: {
    fontFamily: "Arvo_400Regular",
    fontSize: 20,
    padding: 10,
  },
  verticalLine: {
    height: "50%",
    width: 1,
    backgroundColor: "black",
    marginLeft: 20,
    marginRight: 20,
  },
});

export default NavigationBar;
