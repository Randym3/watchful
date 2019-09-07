import { GET_WATCH, GET_WATCHES, LOADED_API, LOADING_API } from "./types";
import axios from "axios";

const options = {
  headers: {
    "x-auth-token": localStorage.getItem("jwtToken")
  }
};
export const getWatches = () => async dispatch => {
  dispatch({ type: LOADING_API });
  try {
    const res = await axios.get(
      "https://watchful-rm-api.herokuapp.com/api/watches"
    );
    dispatch({
      type: GET_WATCHES,
      payload: res.data
    });
  } catch (ex) {
    console.log(Object.entries(ex));
  }
  dispatch({ type: LOADED_API });
};

export const getWatchDetails = id => async dispatch => {
  dispatch({ type: LOADING_API });
  try {
    const res = await axios.get(
      `https://watchful-rm-api.herokuapp.com/api/watches/${id}`,
      options
    );

    dispatch({
      type: GET_WATCH,
      payload: res.data
    });
  } catch (ex) {
    console.log(ex);
  }
  dispatch({ type: LOADED_API });
};
