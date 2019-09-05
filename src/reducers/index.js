import { combineReducers } from "redux";

import userReducer from "./userReducer";
import watchReducer from "./watchReducer";

export default combineReducers({
  user: userReducer,
  watches: watchReducer
});
