import React, { Component } from "react";
import axios from "axios";
import "./LandingPage.css";

export class WatchDetails extends Component {
  state = {
    watch: {},
    forbidden: false
  };

  componentDidMount() {
    this.getWatch();
  }
  getWatch = () => {
    const { id } = this.props.match.params;

    axios
      .get(`http://localhost:6677/api/watches/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("jwtToken")
        }
      })
      .then(data => {
        this.setState({ watch: data.data, forbidden: false, errMessage: "" });
      })
      .catch(err => {
        console.log(err.response);

        if (err.response.status === 401) {
          this.setState({ forbidden: true, errMessage: err.response.data });
        }
      });
  };

  render() {
    console.log(this.state);
    const {
      title,
      description,
      image_path,
      price,
      quantity
    } = this.state.watch;
    console.log(this.state.watch);
    return (
      <div className="container">
        {this.state.forbidden ? (
          <div className="hook" style={{ position: "fixed", width: "100%" }}>
            {" "}
            <h1>{this.state.errMessage}</h1>
          </div>
        ) : (
          <div className="hook">
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
        )}

        <div
          className="image"
          style={{
            backgroundImage: `url(${image_path})`,
            flex: "1",
            height: "70%",
            alignSelf: "center"
          }}
        ></div>
      </div>
    );
  }
}

export default WatchDetails;
