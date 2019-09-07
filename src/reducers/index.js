import { combineReducers } from "redux";

import userReducer from "./userReducer";
import watchReducer from "./watchReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
  user: userReducer,
  watches: watchReducer,
  loading: loadingReducer
});
