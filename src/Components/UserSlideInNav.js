import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UserSlideInNav.css";
import { connect } from "react-redux";

export class UserSlideInNav extends Component {
  onToggle = e => {
    let nav;
    if (e.target.closest("nav").className === "slideInNav") {
      nav = e.target.closest("nav");
      nav.style.transform = "";
      nav.style.webKittransform = "";
    } else return;
  };
  render() {
    return (
      <nav className="slideInNav">
        <i
          style={{
            position: "absolute",
            cursor: "pointer",
            fontSize: "25px",
            padding: "20px"
          }}
          className="fas fa-angle-right"
          onClick={this.onToggle}
        ></i>
        <h4>{this.props.currentUser.name}</h4>

        <p>
          {" "}
          ID: <br />
          {this.props.currentUser.id}
        </p>
        <hr />
        <ul>
          <li>
            <Link to="/profile" onClick={this.onToggle}>
              {" "}
              <i className="fas fa-user-edit"></i> Edit Info{" "}
            </Link>
          </li>
          <li>
            <Link to="/purchases" onClick={this.onToggle}>
              {" "}
              <i className="fas fa-shopping-bag"></i> Purchases{" "}
            </Link>
          </li>
          <li>
            <Link to="/products-admin" onClick={this.onToggle}>
              {" "}
              <i className="fas fa-user-lock"></i> View/Edit Products{" "}
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.userDetails
});
export default connect(
  mapStateToProps,
  null
)(UserSlideInNav);
