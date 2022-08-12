import createDataContext from "./createDataContext";
import claspApi from "../api/clasp";

const messageReducer = (state, action) => {
  switch (action.type) {
    case "load_conversations":
      return { ...state, conversations: action.payload };
    case "load_conversation":
      return {
        ...state,
        curConvo: {
          conversation: action.payload.conversation,
          other: action.payload.other,
        },
      };
    case "send_message":
      let newConvo = state.curConvo;
      newConvo.conversation.messages.push(action.payload);
      return { ...state, curConvo: newConvo };
    case "add_error":
      return { ...state, error: action.payload };
    case "create_conversation":
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    default:
      return state;
  }
};

const addMessage = (dispatch) => async (newMessage) => {
  dispatch({ type: "send_message", payload: newMessage });
};

const loadConversation = (dispatch) => async (conversationID) => {
  try {
    const response = await claspApi.get("/conversation/" + conversationID);
    dispatch({
      type: "load_conversation",
      payload: {
        conversation: response.data.conversation,
        other: response.data.other,
      },
    });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong... please try again shortly",
    });
  }
};

const addConversation = (dispatch) => async (newConversation) => {
  dispatch({ type: "create_conversation", payload: newConversation });
};

const loadConversations = (dispatch) => async () => {
  try {
    const response = await claspApi.get("/conversations");
    dispatch({ type: "load_conversations", payload: response.data });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong... please try again shortly",
    });
  }
};

const sendMessage = (dispatch) => async (newMessage, conversationID) => {
  try {
    const response = claspApi.post(
      "/createmessage/" + conversationID,
      newMessage
    );
    dispatch({ type: "send_message", payload: newMessage });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong... please try again shortly",
    });
  }
};

const createConversation = (dispatch) => async () => {
  try {
    const response = await claspApi.post("/createconversation");
    dispatch({ type: "create_conversation", payload: response.data });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong... please try again shortly",
    });
    console.log(err);
  }
};

export const { Provider, Context } = createDataContext(
  messageReducer,
  {
    sendMessage,
    loadConversations,
    createConversation,
    addConversation,
    loadConversation,
    addMessage,
  },
  {
    error: "",
    conversations: [],
    curConvo: {},
  }
);
