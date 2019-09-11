import {
  GET_WATCH,
  GET_WATCHES,
  CREATE_WATCH_ADMIN,
  EDIT_WATCH_ADMIN,
  DELETE_WATCH_ADMIN,
  EDIT_ERROR,
  CREATE_ERROR,
  CLEAR_ERRORS
} from "../actions/types";
const initialState = {
  watches: [],
  watchDetails: {},
  editError: "",
  createError: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WATCH:
      return {
        ...state,
        watchDetails: action.payload
      };

    case GET_WATCHES:
      return {
        ...state,
        watches: action.payload
      };
    case DELETE_WATCH_ADMIN:
      return {
        ...state,
        watches: state.watches.filter(cur => cur.id !== action.payload)
      };

    case EDIT_WATCH_ADMIN:
      return {
        ...state,
        watchDetails: action.payload
      };
    case CREATE_WATCH_ADMIN:
      return {
        ...state,
        watches: [action.payload, ...state.watches]
      };
    case EDIT_ERROR:
      return {
        ...state,
        editError: action.payload
      };

    case CREATE_ERROR:
      return {
        ...state,
        createError: action.payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        editError: "",
        createError: ""
      };

    default:
      return state;
  }
}
