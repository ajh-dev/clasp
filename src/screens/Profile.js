import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";
import { AntDesign } from "@expo/vector-icons";
import NavigationBar from "../components/NavigationBar";
import BackButton from "../components/BackButton";
import { Context as userContext } from "../context/userContext";

const Profile = ({ navigation }) => {
  const [nameDisabled, setNameDisabled] = useState(false);
  const [conditionDisabled, setConditionDisabled] = useState(false);
  const [locationDisabled, setLocationDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const userBackend = useContext(userContext);

  useEffect(() => {
    userBackend.getProfile();
  }, []);

  return Object.keys(userBackend.state.self).length >= 1 ? (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Text style={styles.header}>Profile</Text>
      <Image
        style={styles.image}
        source={require("../../assets/blank-profile.png")}
      />
      <View style={styles.fieldsContainer}>
        {Object.entries(
          JSON.parse(
            JSON.stringify({ ...userBackend.state.self, __t: undefined })
          )
        ).map(([key, value]) => {
          return (
            <Text key={value} style={styles.fields}>
              {key + ": " + value}
            </Text>
          );
        })}
      </View>
      <NavigationBar navigation={navigation} isHome />
    </View>
  ) : (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="tomato" />
      {userBackend.state.errorMessage
        ? Alert.alert(
            userBackend.state.errorMessage,
            "Please try again or contact us",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate(route.params.backRoute),
              },
            ]
          )
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  asterisk: {
    fontFamily: "Arvo_400Regular",
    fontSize: 20,
    color: "#FFCA03",
    lineHeight: 18,
  },
  container: {
    flex: 1,
    backgroundColor: "#C4D7E0",
  },
  disabledText: {
    fontFamily: "Arvo_400Regular",
    fontSize: 20,
    color: "#FFCA03",
  },
  fields: {
    fontFamily: "Arvo_400Regular",
    fontSize: 30,
    marginVertical: 15,
  },
  header: {
    fontFamily: "Arvo_400Regular",
    fontSize: 40,
    marginTop: 70,
    marginLeft: 50,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 50,
    marginTop: 25,
  },
  disableButton: {
    marginLeft: 10,
    backgroundColor: "red",
    borderRadius: 12,
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  fieldsContainer: {
    marginLeft: 50,
    marginTop: 25,
    flex: 1,
  },
});

export default Profile;
