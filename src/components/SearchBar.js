import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ onChangeText }) => {
  const tempTreatments = [{ name: "smoothies and pills", rating: 45 }];
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(newInput) => onChangeText(newInput)}
        autoCapitalize="none"
        autoCorrect={false}
        caretHidden
        placeholder="search keyword here"
        placeholderTextColor="black"
      />
      <AntDesign style={styles.icon} name="search1" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    right: 0,
  },
  container: {
    borderRadius: 30,
    backgroundColor: "#c6c6c6",
    padding: 5,
    width: 275,
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    borderRadius: 15,
    backgroundColor: "white",
    fontSize: 20,
    padding: 5,
    fontFamily: "Arvo_400Regular",
    flex: 1,
  },
});

export default SearchBar;
