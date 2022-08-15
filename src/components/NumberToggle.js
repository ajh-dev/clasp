import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";

const NumberToggle = ({ numberRange, style, onChange }) => {
  const [buttonPressed, setButtonPressed] = useState(1);

  return (
    <View style={[styles.container, style]}>
      {Array.apply(null, { length: numberRange }).map((e, i) => (
        <TouchableOpacity
          key={i}
          style={[
            i === 0
              ? styles.outerButtonLeft
              : i === numberRange - 1
              ? styles.outerButtonRight
              : styles.innerButton,
            i + 1 === buttonPressed ? styles.orange : null,
          ]}
          onPress={() => {
            onChange(i + 1);
            setButtonPressed(i + 1);
          }}
          activeOpacity={1}
        >
          <Text style={styles.number}>{i + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  orange: {
    backgroundColor: "#DC552C",
  },
  outerButtonRight: {
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#bababa",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  outerButtonLeft: {
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#bababa",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  innerButton: {
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#bababa",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#ededed",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  number: {
    fontFamily: "Arvo_400Regular",
    fontSize: 20,
  },
});

export default NumberToggle;
