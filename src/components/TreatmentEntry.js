import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TreatmentEntry = ({ treatmentID, navigation, name, rating }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.treatmentContainer}
        onPress={() =>
          navigation.navigate("UserDataCollection", { treatmentID })
        }
      >
        <Text style={styles.treatmentTitle}>{name}</Text>
        <View style={styles.ratingInfo}>
          <Text style={styles.ratingText}>{rating}</Text>
          <View style={styles.linearGradientBackground}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#FFE3E3", "#FA5F55"]}
              style={[styles.linearGradient, { width: (rating / 20) * 250 }]}
            ></LinearGradient>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  treatmentContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 300,
    height: 70,
    padding: 5,
    marginTop: 15,
  },
  linearGradient: {
    marginRight: 15,
    borderRadius: 15,
    height: 25,
    marginBottom: 0,
  },
  treatmentTitle: {
    fontFamily: "Arvo_400Regular",
    fontSize: 17,
  },
  ratingInfo: {
    flexDirection: "row",
    marginTop: 5,
  },
  linearGradientBackground: {
    marginLeft: 10,
    flex: 1,
    backgroundColor: "#E7E7E7",
    borderRadius: 15,
    justifyContent: "center",
    padding: 2,
  },
  ratingText: {
    fontFamily: "Arvo_400Regular",
    fontSize: 20,
  },
});

export default TreatmentEntry;
