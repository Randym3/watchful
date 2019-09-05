import React, { Component } from "react";

import { Provider } from "react-redux";
import AppWithStore from "./AppWithStore";
import store from "./store";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithStore />
      </Provider>
    );
  }
}

export default App;
