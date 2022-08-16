import React, { useEffect, useContext } from "react";
import { Context as userContext } from "../context/userContext";

const InitialLoad = ({ navigation }) => {
  const { state, localSignin } = useContext(userContext);

  useEffect(() => {
    localSignin();

    if (state.token === null) {
      navigation.navigate("Startup");
    } else {
      navigation.navigate("Home", { backRoute: "Startup" });
    }
  }, []);

  return null;
};

export default InitialLoad;
