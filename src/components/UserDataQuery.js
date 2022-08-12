import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import NumberToggle from "./NumberToggle";

const UserDataQuery = ({ query, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.query}>{query}</Text>
      <NumberToggle numberRange={5} style={styles.toggle} onChange={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  query: {
    fontFamily: "Arvo_400Regular",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  toggle: {
    marginVertical: 5,
  },
  container: {
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default UserDataQuery;
