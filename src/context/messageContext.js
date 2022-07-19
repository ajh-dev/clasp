import createDataContext from "./createDataContext";
import claspApi from "../api/clasp";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import { ENDPOINT } from "../api/ENDPOINT";
import clasp from "../api/clasp";

const socket = io(ENDPOINT);

const messageReducer = (state, action) => {
  switch (action.type) {
    case "load_conversations":
      return { ...state, conversations: action.payload };
    // case 'load_conversation':
    //     return {...state, curConvo: action.payload};
    case "send_message":
      let newConvo = state.curConvo;
      newConvo.messages.push(action.payload);
      return { ...state, curConvo: newConvo };
    case "add_error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// const loadConversation = async (conversationID) => {
//     try{
//         const response = claspApi.get('/conversation/' + conversationID);
//         dispatch({type: 'load_conversation', payload: response});
//     } catch(err){
//         dispatch({ type: 'add_error', payload: "Something went wrong... please try again shortly"});
//     }
// };

const loadConversations = async () => {
  try {
    const response = claspApi.get("/conversations");
    dispatch({ type: "load_conversation", payload: response });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong... please try again shortly",
    });
  }
};

const sendMessage = async (newMessage, conversationID) => {
  try {
    const response = claspApi.send(
      "/createmessage/" + conversationID,
      newMessage
    );
    socket.emit("sendMessage", newMessage);
    dispatch({ type: "send_message", payload: newMessage });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong... please try again shortly",
    });
  }
};

const createConversation = async () => {
  try {
    const response = claspApi.send("/createconversation");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong... please try again shortly",
    });
  }
};

export const { Provider, Context } = createDataContext(
  messageReducer,
  { sendMessage, loadConversations, createConversation },
  {
    curConvo: [{ message: "", sender: "", receiver: "" }],
    error: "",
    conversations: [],
  }
);
