import React, { Component } from "react";

import { getWatchDetails } from "../actions/watchActions";
import { connect } from "react-redux";
import "./LandingPage.css";

export class WatchDetails extends Component {
  componentDidMount() {
    this.props.getWatchDetails(this.props.match.params.id);
  }

  render() {
    const {
      title,
      description,
      image_path,
      price,
      quantity
    } = this.props.details;

    return (
      <div className="container details">
        {this.props.isAuthenticated ? (
          <div className="hook details">
            <h1>{title}</h1>
            <p>
              <i>{description}</i>
            </p>
            <p style={{ fontSize: "20px", margin: "20px 0" }}>
              <i>Stock: {quantity}</i>
            </p>
            <h2 style={{ marginTop: "20px" }}>$ {price}</h2>
            <button disabled style={{ cursor: "not-allowed" }}>
              ADD TO CART
            </button>
          </div>
        ) : (
          <div
            className="hook details"
            style={{ position: "fixed", width: "100%" }}
          >
            {" "}
            <h1>Access Denied</h1>
          </div>
        )}

        <div
          className="image"
          style={{
            backgroundImage: `url(${image_path})`,
            backgroundSize: "contain",
            flex: "1.5",
            width: "100%",
            height: "100%",
            alignSelf: "center"
          }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  details: state.watches.watchDetails,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getWatchDetails }
)(WatchDetails);
