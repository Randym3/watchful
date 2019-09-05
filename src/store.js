import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const initalState = {};

const store = createStore(
  rootReducer,
  initalState,
  compose(applyMiddleware(...middleware))
);

export default store;
