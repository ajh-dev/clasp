import createDataContext from "./createDataContext";
import claspApi from "../api/clasp";

const treatmentReducer = (state, action) => {
  switch (action.type) {
    case "load_treatments":
      return { ...state, treatments: action.payload };
    case "add_treatment":
      return { ...state, treatments: [...state.treatments, action.payload] };
    case "add_error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const loadTreatments = (dispatch) => async () => {
  try {
    const response = await claspApi.get("/gettreatments");
    dispatch({ type: "load_treatments", payload: response.data });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong",
    });
  }
};

const createTreatment = (dispatch) => async (newTreatment) => {
  try {
    const response = await claspApi.post("/createnewtreatment", newTreatment);
    dispatch({ type: "add_treatment", payload: response.data });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong",
    });
  }
};

const addRating = (dispatch) => async (conversationID, rating) => {
  try {
    const response = await claspApi.post("/addrating/" + conversationID, {
      rating,
    });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong",
    });
  }
};

export const { Provider, Context } = createDataContext(
  treatmentReducer,
  { loadTreatments, createTreatment, addRating },
  { treatments: [], error: "" }
);
