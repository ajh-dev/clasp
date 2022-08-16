import React, { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import NavigationBar from "../components/NavigationBar";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";
import UserDataQuery from "../components/UserDataQuery";
import SubmitButton from "../components/SubmitButton";
import { Context as treatmentContext } from "../context/treatmentContext";

const UserDataCollection = ({ navigation, route }) => {
  const [generalHealth, setGeneralHealth] = useState(0);
  const [physicalHealth, setPhysicalHealth] = useState(0);
  const [mentalHealth, setMentalHealth] = useState(0);
  const [dailyHealth, setDailyHealth] = useState(0);
  const treatmentBackend = useContext(treatmentContext);

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
          onSubmit={
            typeof route.params.newTreatmentName === "undefined"
              ? () => {
                  treatmentBackend.addRating(
                    route.params.treatmentID,
                    generalHealth + physicalHealth + mentalHealth + dailyHealth
                  );
                  navigation.navigate("Home");
                }
              : () => {
                  treatmentBackend.createTreatment({
                    treatment: route.params.newTreatmentName,
                    ratings:
                      generalHealth +
                      physicalHealth +
                      mentalHealth +
                      dailyHealth,
                  });
                  navigation.navigate("Home");
                }
          }
        />
      </View>
      <NavigationBar isHome navigation={navigation} />
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
