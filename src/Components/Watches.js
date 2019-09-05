import React, { Component } from "react";
import Watch from "./Watch";
import "./Watches.css";
import { connect } from "react-redux";
import { getWatches } from "../actions/watchActions";

export class Watches extends Component {
  UNSAFE_componentWillMount() {
    this.props.getWatches();
  }
  render() {
    const { watches } = this.props;

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
          {watches.map(cur => {
            return <Watch data={cur} key={cur.id} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  watches: state.watches.watches
});

export default connect(
  mapStateToProps,
  { getWatches }
)(Watches);
