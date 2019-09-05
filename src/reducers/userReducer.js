import {
  LOGIN_USER,
  CREATE_USER,
  DELETE_USER,
  EDIT_USER,
  GET_CURRENT_USER,
  SIGNOUT_USER
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  userDetails: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userDetails: action.payload,
        isAuthenticated: true
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
