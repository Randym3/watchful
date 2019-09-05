import { GET_WATCH, GET_WATCHES } from "../actions/types";
const initialState = {
  watches: [],
  watchDetails: {}
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

    default:
      return state;
  }
}
