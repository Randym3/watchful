import {
  CREATE_WATCH_ADMIN,
  EDIT_WATCH_ADMIN,
  DELETE_WATCH_ADMIN,
  LOADED_API,
  LOADING_API,
  EDIT_ERROR,
  CREATE_ERROR
} from "./types";
import axios from "axios";
const options = {
  headers: {
    "x-auth-token": localStorage.getItem("jwtToken")
  }
};
export const deleteWatch = id => async dispatch => {
  dispatch({ type: LOADING_API });
  try {
    const res = await axios.delete(
      `https://watchful-rm-api.herokuapp.com/api/watches/${id}`,
      options
    );
    const deleted = res.data.id;
    dispatch({ type: DELETE_WATCH_ADMIN, payload: deleted });
  } catch (ex) {
    console.log(ex);
  }
  dispatch({ type: LOADED_API });
};

export const editWatch = (id, editInfo) => async dispatch => {
  dispatch({ type: LOADING_API });
  try {
    const res = await axios.put(
      `https://watchful-rm-api.herokuapp.com/api/watches/${id}`,
      editInfo,
      options
    );
    const editedWatch = res.data;

    dispatch({ type: EDIT_WATCH_ADMIN, payload: editedWatch });
  } catch (ex) {
    console.log(ex);
    dispatch({ type: EDIT_ERROR, payload: ex.response.data });
  }
  dispatch({ type: LOADED_API });
};
export const createWatch = (newInfo, history) => async dispatch => {
  dispatch({ type: LOADING_API });
  try {
    const res = await axios.post(
      "https://watchful-rm-api.herokuapp.com/api/watches",
      newInfo,
      options
    );
    const newWatch = res.data;
    dispatch({ type: CREATE_WATCH_ADMIN, payload: newWatch });
    history.push("/products-admin");
  } catch (ex) {
    console.log(ex.response.data);
    dispatch({ type: CREATE_ERROR, payload: ex.response.data });
  }
  dispatch({ type: LOADED_API });
};
