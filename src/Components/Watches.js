import React, { Component } from "react";
import axios from "axios";
import Watch from "./Watch";
import "./Watches.css";

export class Watches extends Component {
  state = {
    watches: []
  };

  getWatches = async () => {
    const watchList = await axios.get("http://localhost:6677/api/watches");
    this.setState({ watches: watchList.data });
  };

  componentDidMount() {
    this.getWatches();
  }
  render() {
    const { watches } = this.state;

    return (
      <div style={{ padding: "50px" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "15px" }}>Classic Leather Watches</h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor
            sed viverra ipsum nunc aliquet bibendum enim.
          </p>
        </div>
        <div className="container-row">
          {watches.map((cur, ind) => {
            return <Watch data={cur} key={ind} />;
          })}
        </div>
      </div>
    );
  }
}

export default Watches;
