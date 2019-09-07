import { LOADING_API, LOADED_API } from "../actions/types";

const initialState = {
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_API:
      return {
        ...state,
        isLoading: true
      };

    case LOADED_API:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
