import React from "react";
import notFound from "../../assets/undraw_page_not_found_su7k.svg";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div
      className="container"
      style={{
        flexDirection: "column",
        color: "white",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px"
      }}
    >
      <div>
        <img src={notFound} alt="404 page not found" height="200" />{" "}
      </div>
      <h2>Page not found</h2>
      <p>
        Sorry, but that page you requested could not be found. Please go back to
        the homepage
      </p>
      <Link to="/" style={{ color: "white" }}>
        {" "}
        <h3>
          <i className="fas fa-long-arrow-alt-right"></i>
          <span style={{ margin: "0 10px" }}>HomePage</span>
          <i className="fas fa-long-arrow-alt-left"></i>
        </h3>
      </Link>{" "}
    </div>
  );
}
