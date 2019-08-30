import React, { Component } from "react";
import "./Watch.css";

export class Watch extends Component {
  state = {
    watch: {}
  };
  componentDidMount() {
    this.setState({ watch: this.props.data });
  }
  render() {
    const watch = this.props.data;
    return (
      <div className="card">
        <a href={`/watches/${watch.id}`}>
          <img alt={watch.description} src={watch.image_path} height="300" />
        </a>
      </div>
    );
  }
}

export default Watch;
