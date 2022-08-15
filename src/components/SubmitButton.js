import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";

const SubmitButton = ({ navigation, onSubmit, toScreen, params }) => {
  return (
    <TouchableOpacity
      style={styles.submitButton}
      onPress={() => {
        onSubmit();
        navigation.navigate(toScreen, params);
      }}
    >
      <Text style={styles.submitText}>continue</Text>
    </TouchableOpacity>
  );
};

SubmitButton.defaultProps = {
  params: {},
};

const styles = StyleSheet.create({
  submitText: {
    fontFamily: "Arvo_400Regular",
    fontSize: 25,
  },
  submitButton: {
    backgroundColor: "#AFBCEB",
    width: 200,
    alignSelf: "center",
    marginTop: 50,
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
  },
});

export default SubmitButton;
