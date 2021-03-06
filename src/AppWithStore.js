import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "./Components/Navigation";
import LandingPage from "./Components/LandingPage";
import Watches from "./Components/Watches";
import WatchDetails from "./Components/WatchDetails";
import Loading from "./Components/pages/Loading";
import UserProfile from "./Components/UserProfile";
import NotFound from "./Components/pages/NotFound";
import ProductsAdmin from "./Components/ProductsAdmin";
import EditProduct from "./Components/EditProduct";
import AddProduct from "./Components/AddProduct";

import { connect } from "react-redux";

export class AppWithStore extends Component {
  render() {
    return (
      <div>
        {this.props.isLoading ? (
          <div
            style={{
              display: "flex",
              position: "fixed",
              color: "white",
              zIndex: "100",
              height: "100vh",
              width: "100vw",
              backgroundColor: "#00000081",
              alignItems: "center",
              top: "0",
              left: "0"
            }}
          >
            <Loading />
          </div>
        ) : null}
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
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/products-admin" component={ProductsAdmin} />
            <Route
              exact
              path="/products-admin/add-product"
              component={AddProduct}
            />
            <Route exact path="/products-admin/:id" component={EditProduct} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.loading.isLoading
});

export default connect(
  mapStateToProps,
  null
)(AppWithStore);
