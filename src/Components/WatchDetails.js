import React, { Component } from "react";
import AccessDenied from "./pages/AccessDenied";
import { getWatchDetails } from "../actions/watchActions";
import { connect } from "react-redux";
import "./LandingPage.css";
import noImage from "../assets/noimage.jpg";

export class WatchDetails extends Component {
  componentDidMount() {
    this.props.getWatchDetails(this.props.match.params.id);
    window.scrollTo(0, 0);
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
                backgroundImage: `url(${image_path ? image_path : noImage})`,
                backgroundSize: "contain",
                flex: "1.5",
                width: `${image_path ? "100%" : "50%"}`,
                height: `${image_path ? "80%" : "50%"}`,
                alignSelf: "center"
              }}
            ></div>
          </div>
        ) : (
          <AccessDenied />
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
