import React from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import SearchBar from "../components/SearchBar";

const UserDataList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>reported treatments</Text>
      </View>
      <SearchBar onChangeText={() => console.log("hello")} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 75,
    marginHorizontal: 10,
  },
  title: {
    fontFamily: "Arvo_400Regular",
    fontSize: 30,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#a1eded",
    flex: 1,
  },
});

export default UserDataList;
