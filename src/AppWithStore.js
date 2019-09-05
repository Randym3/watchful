import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "./Components/Navigation";
import LandingPage from "./Components/LandingPage";
import Watches from "./Components/Watches";
import WatchDetails from "./Components/WatchDetails";

import { connect } from "react-redux";
import { getCurrentUser } from "./actions/userActions";

export class AppWithStore extends Component {
  render() {
    this.props.getCurrentUser();
    return (
      <div>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <div>
                  <LandingPage />
                  <Watches />
                </div>
              )}
            />
            <Route exact path="/watches/:id" component={WatchDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  { getCurrentUser }
)(AppWithStore);
