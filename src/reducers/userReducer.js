import {
  LOGIN_USER,
  CREATE_USER,
  DELETE_USER,
  EDIT_USER,
  GET_CURRENT_USER,
  SIGNOUT_USER,
  LOGIN_ERROR,
  REGISTER_ERROR,
  EDIT_ERROR
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  userDetails: {},
  registerError: "",
  loginError: "",
  editError: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userDetails: action.payload,
        isAuthenticated: true
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      };
    case REGISTER_ERROR:
      return {
        ...state,
        registerError: action.payload
      };
    case EDIT_ERROR:
      return {
        ...state,
        editError: action.payload
      };
    case CREATE_USER:
      return {
        ...state,
        userDetails: action.payload,
        isAuthenticated: true
      };
    case DELETE_USER:
      return {
        ...state,
        userDetails: action.payload,
        isAuthenticated: false
      };

    case EDIT_USER:
      return {
        ...state,
        userDetails: action.payload
      };

    case GET_CURRENT_USER:
      return {
        ...state,
        userDetails: action.payload,
        isAuthenticated: true
      };

    case SIGNOUT_USER:
      return {
        ...state,
        userDetails: action.payload,
        isAuthenticated: false
      };

    default:
      return state;
  }
}
