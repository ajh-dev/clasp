import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import NavigationBar from "../components/NavigationBar";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";
import UserDataQuery from "../components/UserDataQuery";
import SubmitButton from "../components/SubmitButton";

const UserDataCollection = ({ navigation }) => {
  const [generalHealth, setGeneralHealth] = useState(0);
  const [physicalHealth, setPhysicalHealth] = useState(0);
  const [mentalHealth, setMentalHealth] = useState(0);
  const [dailyHealth, setDailyHealth] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>treatment analysis</Text>
        <Text style={styles.subTitle}>
          1 - strongly disagree/ 5 - strongly agree
        </Text>
      </View>
      <View style={styles.queries}>
        <UserDataQuery
          query="My general health is good"
          onChange={(input) => setGeneralHealth(input)}
        />
        <UserDataQuery
          query="My physical health (i.e illness/injury) over the past 30 days has been good"
          onChange={(input) => setPhysicalHealth(input)}
        />
        <UserDataQuery
          query="My mental health (i.e stress/depression) over the past 30 days has been good"
          onChange={(input) => setMentalHealth(input)}
        />
        <UserDataQuery
          query="My health (physical and mental) has not prevented me from doing my usual activities"
          onChange={(input) => setDailyHealth(input)}
        />
        <SubmitButton
          navigation={navigation}
          onSubmit={() => console.log("submitted expreience")}
          toScreen="Home"
        />
      </View>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 75,
  },
  title: {
    fontFamily: "Arvo_400Regular",
    fontSize: 30,
  },
  subTitle: {
    fontFamily: "Arvo_400Regular",
    fontSize: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  queries: {
    alignItems: "center",
    flex: 1,
  },
});

export default UserDataCollection;
