import createDataContext from "./createDataContext";
import claspApi from "../api/clasp";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "create_user":
      axios.defaults.headers.common["authorization"] = action.payload;
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "create_user_id":
      axios.defaults.headers.common["authorization"] = action.payload;
      return {
        errorMessage: "",
        token: action.payload.token,
        userCode: action.payload.userCode,
      };
    default:
      return state;
  }
};

const localSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("@api-token");

  if (token) {
    dispatch({ type: "create_user", payload: token });
  }
};

const createUser = (dispatch) => async (userInfo) => {
  try {
    const response = await claspApi.post("/createuserprofile", userInfo);
    await AsyncStorage.setItem("@api_token", response.data.token);
    dispatch({ type: "create_user", payload: response.data.token });
    dispatch({ type: "clear_error_message" });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signup",
    });
  }
};

const createUserID = (dispatch) => async (userInfo) => {
  try {
    const response = await claspApi.post("/createuserid", userInfo);
    await AsyncStorage.setItem("@api_token", response.data.token);
    dispatch({ type: "create_user_id", payload: response.data });
    dispatch({ type: "clear_error_message" });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signup",
    });
    console.log(err.message);
  }
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { createUser, localSignin, createUserID },
  { userCode: null, token: null, errorMessage: "" }
);
