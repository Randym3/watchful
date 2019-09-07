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
      <div>
        {this.props.isAuthenticated ? (
          <div className="container details">
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
            <div
              className="image"
              style={{
                backgroundImage: `url(${image_path})`,
                backgroundSize: "contain",
                flex: "1.5",
                width: "100%",
                height: "80%",
                alignSelf: "center"
              }}
            ></div>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              backgroundImage: " linear-gradient( to right,#232526,#414345)",
              color: "white",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {" "}
            <h1>Access Denied</h1>
          </div>
        )}
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
