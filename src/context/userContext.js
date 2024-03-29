import createDataContext from "./createDataContext";
import claspApi from "../api/clasp";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "create_user":
      claspApi.defaults.headers.common["authorization"] = action.payload;
      return { ...state, errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "create_user_id":
      claspApi.defaults.headers.common["authorization"] = action.payload.token;
      return {
        ...state,
        errorMessage: "",
        token: action.payload.token,
        userCode: action.payload.userCode,
      };
    case "get_profile":
      return { ...state, self: action.payload };
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

const getProfile = (dispatch) => async () => {
  try {
    const response = await claspApi.get("/user");
    console.log(response.data);
    dispatch({ type: "get_profile", payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong",
    });
  }
};

const getUserByID = (dispatch) => async (userID) => {
  try {
    const response = await claspApi.get("/user/" + userID);
    return response.data;
  } catch (err) {
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong",
    });
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
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signup",
    });
  }
};

const checkLogin = (dispatch) => async (loginInfo) => {
  try {
    const response = await claspApi.post("/user", loginInfo);

    const { result, token } = response.data;

    if (result) {
      dispatch({ type: "create_user", payload: token });
      dispatch({ type: "clear_error_message" });
      await AsyncStorage.setItem("@api_token", token);
    } else {
      dispatch({ type: "add_error", payload: "Incorrect login information" });
    }

    return result;
  } catch (err) {
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signup",
    });
  }
};

export const { Provider, Context } = createDataContext(
  userReducer,
  {
    createUser,
    localSignin,
    createUserID,
    getUserByID,
    checkLogin,
    getProfile,
  },
  { userCode: null, token: null, errorMessage: "", self: {} }
);
