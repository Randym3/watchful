import React, { Component } from "react";
import "./LandingPage.css";

export class LandingPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="container" style={{ padding: "0 " }}>
        <div className="hook mobile">
          <h1>Limited Edition</h1>
          <p>Handmade premium leather. Only 1000 made</p>
          <button>SHOP NOW</button>
        </div>

        <div className="image mobile"></div>
      </div>
    );
  }
}

export default LandingPage;
