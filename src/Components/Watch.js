import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Watch.css";
import noImage from "../assets/noimage.jpg";

export class Watch extends Component {
  render() {
    const watch = this.props.data;
    return (
      <div className="card">
        <Link to={`/watches/${watch.id}`}>
          <img
            alt={watch.description}
            src={watch.image_path ? watch.image_path : noImage}
            height="300"
          />
        </Link>
        <h2>{watch.title}</h2>
        <h3>
          $ <i>{` ${watch.price}`}</i>
        </h3>
      </div>
    );
  }
}

export default Watch;
