import React from "react";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
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
      <div>
        {" "}
        <h1>Access Denied</h1>
        <Link to="/" style={{ color: "white" }}>
          {" "}
          <h3>
            <i className="fas fa-long-arrow-alt-right"></i>
            <span style={{ margin: "0 10px" }}>HomePage</span>
            <i className="fas fa-long-arrow-alt-left"></i>
          </h3>
        </Link>{" "}
      </div>
    </div>
  );
}
