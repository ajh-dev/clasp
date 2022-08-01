import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import { Context as UserContext } from "../context/userContext";

const SignupID = ({ navigation }) => {
  const profileContext = useContext(UserContext);
  const [healthCondition, setHealthCondition] = useState("");

  const submitUserData = () => {
    let data = {
      conditions: [healthCondition],
    };
    console.log(data);

    profileContext.createUserID(JSON.parse(JSON.stringify(data)));
  };

  const healthConditions = [
    { label: "cancer", value: "cancer" },
    { label: "diabetes", value: "diabetes" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Here's all you\nneed to login!"}</Text>
      <View style={styles.dropdown}>
        <UserInput
          inputName="condition"
          onInputChange={(newInput) => setHealthCondition(newInput)}
          type="dropdown"
          optionalStatus={""}
          pickerOptions={healthConditions}
          curPicker={healthCondition}
        />
      </View>
      {profileContext.state.userCode
        ? Alert.alert(profileContext.state.userCode)
        : null}
      <SubmitButton navigation={navigation} onSubmit={submitUserData} />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 100,
  },
  subheader: {
    fontFamily: "Arvo_400Regular",
    marginTop: 50,
    fontSize: 20,
  },
  container: {
    backgroundColor: "#A9E8E9",
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Arvo_400Regular",
    marginTop: 125,
    fontSize: 30,
  },
});

export default SignupID;
