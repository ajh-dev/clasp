import React, { useContext, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import UserInput from "../components/UserInput";
import { Arvo_400Regular } from "@expo-google-fonts/arvo";
import SubmitButton from "../components/SubmitButton";
import { Context as UserContext } from "../context/userContext";
import { findFocusedRoute } from "@react-navigation/native";

const reducer = (state, action) => {
  switch (action.type) {
    case "change_name":
      return { ...state, name: { ...state.name, value: action.payload } };
    case "change_password":
      return {
        ...state,
        password: { ...state.password, value: action.payload },
      };
    case "change_condition":
      return {
        ...state,
        condition: { ...state.condition, value: action.payload },
      };
    case "change_location":
      return {
        ...state,
        location: { ...state.location, value: action.payload },
      };
    case "change_image":
      return { ...state, image: { ...state.image, value: action.payload } };
    default:
      return state;
  }
};

const SignupProfile = ({ navigation }) => {
  const profileContext = useContext(UserContext);

  const healthConditions = [
    { label: "cancer", value: "cancer" },
    { label: "diabetes", value: "diabetes" },
  ];
  const locations = [
    { label: "livingston", value: "livinston" },
    { label: "randolph", value: "randolph" },
  ];

  const [state, dispatch] = useReducer(reducer, {
    name: { value: "", type: "text", optional: false, pickerOptions: [] },
    password: { value: "", type: "text", optional: false, pickerOptions: [] },
    condition: {
      value: "",
      type: "dropdown",
      optional: false,
      pickerOptions: healthConditions,
    },
    location: {
      value: "",
      type: "dropdown",
      optional: true,
      pickerOptions: locations,
    },
    image: { value: "", type: "addPicture", optional: true, pickerOptions: [] },
  });

  const submitUserData = () => {
    let data = {
      name: state.name.value === "" ? undefined : state.name.value,
      location: state.location.value === "" ? undefined : state.location.value,
      conditions: [state.condition.value],
      img: state.image.value === "" ? undefined : state.image.value,
      password: state.password.value === "" ? undefined : state.password.value,
    };

    profileContext.createUser(JSON.parse(JSON.stringify(data)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>create profile</Text>
      {Object.entries(state).map(([key, value]) => {
        return (
          <UserInput
            key={key}
            inputName={key}
            onInputChange={(newInput) =>
              dispatch({ type: "change_" + key, payload: newInput })
            }
            type={value.type}
            optionalStatus={value.optional ? " (optional)" : ""}
            pickerOptions={value.pickerOptions}
            curPicker={value.value}
          />
        );
      })}
      {state.image.value ? (
        <Image source={{ uri: state.image.value }} style={styles.profilePic} />
      ) : null}
      <SubmitButton
        onSubmit={submitUserData}
        navigation={navigation}
        toScreen="Home"
      />
      {profileContext.state.errorMessage
        ? Alert.alert(profileContext.state.errorMessage)
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    alignSelf: "flex-start",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginLeft: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#F3D9FF",
  },
  title: {
    fontFamily: "Arvo_400Regular",
    marginTop: 125,
    marginLeft: 50,
    fontSize: 30,
  },
  error: {
    textAlign: "center",
    marginLeft: 50,
    fontSize: 25,
    color: "orange",
  },
});

export default SignupProfile;
