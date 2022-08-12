import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const StartupSlide = ({
  header,
  subheader1,
  subheader2,
  subheader3,
  isRed,
}) => {
  return (
    <View style={[styles.container, isRed ? styles.red : styles.blue]}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.subHeader}>{subheader1}</Text>
      <Text style={styles.subHeader}>{subheader2}</Text>
      {subheader3 ? <Text style={styles.subHeader}>{subheader3}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    alignItems: "center",
    width,
  },
  header: {
    fontFamily: "Arvo_400Regular",
    fontSize: 40,
    marginTop: 200,
    marginBottom: 200,
  },
  subHeader: {
    fontFamily: "Arvo_400Regular",
    fontSize: 25,
    textAlign: "center",
    padding: 10,
  },
  blue: {
    backgroundColor: "#BDE4F4",
  },
  red: {
    backgroundColor: "#F4CBC2",
  },
});

export default StartupSlide;
