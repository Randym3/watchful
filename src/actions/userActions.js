import {
  GET_CURRENT_USER,
  CREATE_USER,
  DELETE_USER,
  EDIT_USER,
  LOGIN_USER,
  SIGNOUT_USER,
  LOGIN_ERROR,
  REGISTER_ERROR,
  LOADED_API,
  LOADING_API,
  EDIT_ERROR
} from "./types";
import axios from "axios";

export const loginUser = loginInfo => async dispatch => {
  dispatch({ type: LOADING_API });
  try {
    const res = await axios.post(
      "https://watchful-rm-api.herokuapp.com/api/auth",
      loginInfo
    );

    const token = res.headers["x-auth-token"];
    localStorage.setItem("jwtToken", token);
    dispatch({ type: LOGIN_USER, payload: res.data });
    dispatch({ type: LOADED_API });
    window.location.href = window.location.pathname;
  } catch (ex) {
    dispatch({ type: LOGIN_ERROR, payload: ex.response.data });
    dispatch({ type: LOADED_API });
  }
};
export const signoutUser = () => dispatch => {
  dispatch({ type: LOADING_API });
  localStorage.removeItem("jwtToken");
  dispatch({ type: SIGNOUT_USER, payload: {} });
  dispatch({ type: LOADED_API });
  window.location.href = window.location.href = "/";
};

export const registerUser = registerInfo => async dispatch => {
  dispatch({ type: LOADING_API });
  try {
    const res = await axios.post(
      "https://watchful-rm-api.herokuapp.com/api/users",
      registerInfo
    );
    const token = res.headers["x-auth-token"];
    localStorage.setItem("jwtToken", token);
    dispatch({ type: CREATE_USER, payload: res.data });
    dispatch({ type: LOADED_API });

    window.location.href = window.location.pathname;
  } catch (ex) {
    dispatch({ type: REGISTER_ERROR, payload: ex.response.data });
    dispatch({ type: LOADED_API });
  }
};

export const getCurrentUser = () => async dispatch => {
  dispatch({ type: LOADING_API });
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw Error(`No token`);
    const res = await axios.get(
      "https://watchful-rm-api.herokuapp.com/api/users/me",
      {
        headers: {
          "x-auth-token": token
        }
      }
    );
    dispatch({ type: GET_CURRENT_USER, payload: res.data });
  } catch (ex) {
    console.log(ex.message);
  }
  dispatch({ type: LOADED_API });
};

export const editUser = editInfo => async dispatch => {
  dispatch({ type: LOADING_API });
  try {
    const token = localStorage.getItem("jwtToken");

    const res = await axios.put(
      "https://watchful-rm-api.herokuapp.com/api/users/me",
      editInfo,
      {
        headers: {
          "x-auth-token": token
        }
      }
    );

    dispatch({ type: EDIT_USER, payload: res.data });
    dispatch({ type: LOADED_API });
  } catch (ex) {
    console.log(ex);
    dispatch({ type: EDIT_ERROR, payload: ex.response.data });
    dispatch({ type: LOADED_API });
  }
};
