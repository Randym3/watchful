import React, { Component } from "react";

import { Provider } from "react-redux";
import AppWithStore from "./AppWithStore";
import store from "./store";
import "./App.css";

import { getCurrentUser } from "./actions/userActions";

store.dispatch(getCurrentUser());
export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithStore onUpdate={() => window.scrollTo(0, 0)} />
      </Provider>
    );
  }
}

export default App;
