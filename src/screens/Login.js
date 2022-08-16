import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import SubmitButton from "../components/SubmitButton";
import UserInput from "../components/UserInput";
import { Context as userContext } from "../context/userContext";

const Login = ({ navigation }) => {
  const userBackend = useContext(userContext);
  const [loginType, setLoginType] = useState("id");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [condition, setCondition] = useState("");
  const [ID, setID] = useState("");

  const handleSubmit = async () => {
    const result = await userBackend.checkLogin({
      password,
      name,
      ID,
      condition,
    });

    if (result) {
      navigation.navigate("Home", { backRoute: "Login" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {"already have an account?\nlogin here"}
      </Text>
      <View style={styles.toggle}>
        <TouchableOpacity
          style={[
            styles.leftToggle,
            loginType === "id"
              ? styles.toggleHighlighted
              : styles.toggleUnhighlighted,
          ]}
          activeOpacity={1}
          onPress={() => setLoginType("id")}
        >
          <Text style={styles.toggleText}>id account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.rightToggle,
            loginType === "profile"
              ? styles.toggleHighlighted
              : styles.toggleUnhighlighted,
          ]}
          activeOpacity={1}
          onPress={() => setLoginType("profile")}
        >
          <Text style={styles.toggleText}>profile account</Text>
        </TouchableOpacity>
      </View>
      {loginType === "profile" ? (
        <View style={styles.formContainer}>
          <UserInput
            inputName="name"
            onInputChange={(newInput) => setName(newInput)}
            type="text"
            optionalStatus=""
          />
          <UserInput
            inputName="password"
            onInputChange={(newInput) => setPassword(newInput)}
            type="text"
            optionalStatus=""
          />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <UserInput
            inputName="ID"
            onInputChange={(newInput) => setID(newInput)}
            type="text"
            optionalStatus=""
          />
          <UserInput
            inputName="condition"
            onInputChange={(newInput) => setCondition(newInput)}
            type="text"
            optionalStatus=""
          />
        </View>
      )}
      {userBackend.state.errorMessage ? (
        <Text style={styles.errorMessage}>
          {userBackend.state.errorMessage}
        </Text>
      ) : null}
      <View style={styles.submit}>
        <SubmitButton navigation={navigation} onSubmit={() => handleSubmit()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: "tomato",
    fontFamily: "Arvo_400Regular",
  },
  toggleHighlighted: {
    backgroundColor: "cornflowerblue",
  },
  toggleUnhighlighted: {
    backgroundColor: "gainsboro",
  },
  container: {
    flex: 1,
    backgroundColor: "ivory",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "Arvo_400Regular",
    marginTop: 50,
    marginLeft: 15,
    fontSize: 30,
    flex: 1,
    textAlign: "center",
  },
  toggleText: {
    fontFamily: "Arvo_400Regular",
    fontSize: 20,
  },
  toggle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftToggle: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  rightToggle: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  formContainer: {
    flex: 2,
    justifyContent: "center",
  },
  submit: {
    flex: 2,
    justifyContent: "center",
  },
});

export default Login;
