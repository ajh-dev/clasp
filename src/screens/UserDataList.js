import React, { useState, useEffect, useReducer } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import SearchBar from "../components/SearchBar";
import TreatmentEntry from "../components/TreatmentEntry";
import { AntDesign } from "@expo/vector-icons";
const _ = require("lodash");
import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";

const testTreatments = [
  { name: "smoothies", rating: 5, id: 1 },
  { name: "tea", rating: 19, id: 2 },
  { name: "vitamins", rating: 15, id: 3 },
  { name: "smoothies", rating: 5, id: 4 },
  { name: "tea", rating: 19, id: 5 },
  { name: "vitamins", rating: 15, id: 6 },
  { name: "smoothies", rating: 5, id: 7 },
  { name: "tea", rating: 19, id: 8 },
  { name: "vitamins", rating: 15, id: 9 },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "change_Name":
      return {
        ...state,
        Name: { ...state.Name, value: action.payload },
      };
    default:
      return state;
  }
};

const UserDataList = ({ navigation }) => {
  const [allTreatments, setAllTreatments] = useState(testTreatments);
  const [userSearch, setUserSearch] = useState("");
  const [addTreatment, setAddTreatment] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    Name: {
      value: "",
      type: "text",
      optional: false,
      pickerOptions: [],
    },
  });

  const modifyFilter = () => {
    const filteredTreatments = _.filter(testTreatments, (treatment) => {
      return treatment.name.includes(userSearch) || userSearch === "";
    });

    setAllTreatments(filteredTreatments);
  };

  useEffect(() => {
    modifyFilter();
  }, [userSearch]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>reported treatments</Text>
        <Text style={styles.subTitle}>
          select a treatment to provide a review or create a new one
        </Text>
      </View>
      <SearchBar onChangeText={(input) => setUserSearch(input.toLowerCase())} />
      {addTreatment ? (
        <View>
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
          <SubmitButton
            navigation={navigation}
            onSubmit={() => console.log("Create treatment in database here")}
            toScreen="UserDataCollection"
          />
        </View>
      ) : null}
      <View style={styles.treatmentList}>
        <FlatList
          style={styles.treatments}
          renderItem={({ item }) => (
            <TreatmentEntry
              rating={item.rating}
              name={item.name}
              treatmentID={item.id}
              navigation={navigation}
            />
          )}
          keyExtractor={(treatment) => treatment.id}
          data={allTreatments}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity
        style={styles.addTreatment}
        onPress={() => setAddTreatment(true)}
      >
        <Text style={styles.subTitle}>create treatment</Text>
        <AntDesign name="plus" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 75,
    marginHorizontal: 5,
    alignItems: "center",
  },
  title: {
    fontFamily: "Arvo_400Regular",
    fontSize: 30,
  },
  subTitle: {
    fontFamily: "Arvo_400Regular",
    fontSize: 17,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#FAD5A5",
    flex: 1,
  },
  treatments: {
    marginTop: 30,
  },
  addTreatment: {
    marginTop: 10,
    marginBottom: 25,
    flex: 1,
    justifyContent: "center",
    width: 200,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#FA8072",
    flexDirection: "row",
  },
  treatmentList: {
    flex: 9,
  },
});

export default UserDataList;
