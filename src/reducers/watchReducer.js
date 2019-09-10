import {
  GET_WATCH,
  GET_WATCHES,
  CREATE_WATCH_ADMIN,
  EDIT_WATCH_ADMIN,
  DELETE_WATCH_ADMIN,
  EDIT_ERROR
} from "../actions/types";
const initialState = {
  watches: [],
  watchDetails: {},
  editError: ""
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
    case EDIT_ERROR:
      return {
        ...state,
        editError: action.payload
      };

    default:
      return state;
  }
}
