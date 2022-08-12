import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const ConversationPreview = ({
  navigation,
  getUser,
  recentMessage,
  isPending,
  conversationID,
}) => {
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const convertIDToName = async () => {
      const user = await getUser();
      setName(user.name ? user.name : "Anonymous");
      setCondition(user.conditions[0]);
    };

    if (firstLoad) {
      convertIDToName();
      setFirstLoad(false);
    }
  });
  return (
    <TouchableOpacity
      style={styles.message}
      onPress={() =>
        navigation.navigate("Message", { conversationID, condition, name })
      }
    >
      <View style={styles.horizontalLine} />
      <Text style={styles.messageHeader}>{name}</Text>
      <Text style={styles.messageText}>{recentMessage}</Text>
      <View style={styles.horizontalLine} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  message: {
    marginTop: 10,
  },
  messageHeader: {
    fontFamily: "Arvo_400Regular",
    fontSize: 20,
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 10,
  },
  messageText: {
    fontFamily: "Arvo_400Regular",
    marginLeft: 35,
    marginBottom: 10,
  },
  horizontalLine: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
});

export default ConversationPreview;
