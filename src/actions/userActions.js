import {
  GET_CURRENT_USER,
  CREATE_USER,
  DELETE_USER,
  EDIT_USER,
  LOGIN_USER,
  SIGNOUT_USER
} from "./types";
import axios from "axios";

export const loginUser = loginInfo => async dispatch => {
  try {
    console.log("logging in user");
    const res = await axios.post(
      "https://watchful-rm-api.herokuapp.com/api/auth",
      loginInfo
    );

    const token = res.headers["x-auth-token"];
    localStorage.setItem("jwtToken", token);
    dispatch({ type: LOGIN_USER, payload: res.data });
    window.location.href = window.location.pathname;
  } catch (ex) {
    console.log(ex.response.data);
  }
};
export const signoutUser = () => dispatch => {
  console.log("SIgning out user");
  localStorage.removeItem("jwtToken");
  dispatch({ type: SIGNOUT_USER, payload: {} });
  window.location.href = window.location.pathname;
};

export const registerUser = registerInfo => async dispatch => {
  try {
    console.log("register user");

    const res = await axios.post(
      "https://watchful-rm-api.herokuapp.com/api/users",
      registerInfo
    );
    const token = res.headers["x-auth-token"];
    localStorage.setItem("jwtToken", token);
    dispatch({ type: CREATE_USER, payload: res.data });
  } catch (ex) {
    console.log(ex.response.data);
  }
  window.location.href = window.location.pathname;
};

export const getCurrentUser = () => async dispatch => {
  try {
    console.log("getting current user");
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
    console.log(ex);
  }
};
