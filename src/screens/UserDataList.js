import React, { useState, useEffect, useReducer, useContext } from "react";
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
import { Context as treatmentContext } from "../context/treatmentContext";

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

const calculateAverage = (ratings) => {
  sum = 0;

  for (let i = 0; i < ratings.length; i++) {
    sum += ratings[i];
  }

  return Math.round(sum / ratings.length);
};

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
  const treatmentBackend = useContext(treatmentContext);
  const [allTreatments, setAllTreatments] = useState(
    treatmentBackend.state.treatments
  );

  useEffect(() => {
    treatmentBackend.loadTreatments();
  }, []);

  const modifyFilter = () => {
    const filteredTreatments = _.filter(
      treatmentBackend.state.treatments,
      (treatment) => {
        return treatment.treatment.includes(userSearch) || userSearch === "";
      }
    );

    setAllTreatments(filteredTreatments);
  };

  useEffect(() => {
    setAllTreatments(treatmentBackend.state.treatments);
  }, [treatmentBackend.state.treatments]);

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
            onSubmit={() => console.log("Treatment created")}
            navigation={navigation}
            toScreen="UserDataCollection"
            params={{ newTreatmentName: state.Name.value }}
          />
        </View>
      ) : null}
      <View style={styles.treatmentList}>
        {!treatmentBackend.state.treatments.empty ? (
          <FlatList
            style={styles.treatments}
            renderItem={({ item }) => (
              <TreatmentEntry
                rating={calculateAverage(item.ratings)}
                name={item.treatment}
                treatmentID={item._id}
                navigation={navigation}
              />
            )}
            keyExtractor={(treatment) => treatment._id}
            data={allTreatments}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.title}>no data available</Text>
        )}
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
