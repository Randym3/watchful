import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { connect } from "react-redux";
import { loginUser, registerUser, signoutUser } from "../actions/userActions";
// import UserSlideInNav from "./UserSlideInNav";

export class Navigation extends Component {
  state = {
    showHamburger: false,
    showLogin: false,
    showRegister: false,
    loginEmail: "",
    loginPassword: "",
    registerEmail: "",
    registerPassword: "",
    registerName: "",
    slideNavStyle: ""
  };

  onPageChange = e => {
    this.setState({
      showHamburger: false,
      showLogin: false,
      showRegister: false
    });
    // let nav;
    // if (e.target.closest("nav").nextElementSibling.className === "slideInNav") {
    //   nav = e.target.closest("nav").nextElementSibling;
    //   nav.style.transform = "";
    //   nav.style.webKittransform = "";
    // } else return;
  };

  onUserToggle = e => {
    this.setState({
      showHamburger: false,
      showLogin: false,
      showRegister: false
    });
    // let nav;
    // if (e.target.closest("nav").nextElementSibling.className === "slideInNav") {
    //   nav = e.target.closest("nav").nextElementSibling;
    //   nav.style.transform = "translateX(0%)";
    //   nav.style.webKittransform = "translateX(0%)";
    // } else return;
  };

  openLogin = e => {
    this.setState({ showLogin: true });
  };

  openRegister = e => {
    this.setState({ showRegister: true });
  };
  handleHamburger = e => {
    this.setState({ showHamburger: !this.state.showHamburger });
  };
  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onLogin = e => {
    e.preventDefault();
    const loginInfo = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    };
    this.props.loginUser(loginInfo);
  };
  onRegister = e => {
    e.preventDefault();

    const registerInfo = {
      name: this.state.registerName,
      email: this.state.registerEmail,
      password: this.state.registerPassword
    };

    this.props.registerUser(registerInfo);
  };
  render() {
    return (
      <React.Fragment>
        <nav className={`menu  ${this.state.showHamburger ? "change" : null} `}>
          <Link
            onClick={this.onPageChange}
            to="/"
            className={`logo menu ${
              this.state.showHamburger ? "change" : null
            }`}
          >
            <i className="far fa-clock"></i> <h3>Watchful</h3>
          </Link>

          {/* <ul
            className={`nav  nav-1 menu ${
              this.state.showHamburger ? "change" : null
            }`}
          ></ul> */}
          <ul
            className={`nav  nav-2 menu ${
              this.state.showHamburger ? "change" : null
            }`}
          >
            {this.props.isAuthenticated ? (
              <React.Fragment>
                <li stlye={{ color: "white" }}>
                  <p style={{ cursor: "default" }}>
                    Hello, {this.props.currentUser.name}{" "}
                  </p>
                </li>
                <li>
                  {" "}
                  <Link to="/profile" onClick={this.onPageChange}>
                    {" "}
                    <i className="fas fa-user-edit"></i> Edit Info{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/products-admin" onClick={this.onPageChange}>
                    {" "}
                    <i className="fas fa-user-lock"></i> View/Edit Products{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <p
                    style={{ position: "relative", cursor: "pointer" }}
                    onClick={this.props.signoutUser}
                  >
                    Logout
                  </p>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* REGISTER BUTTON AND FORM */}
                <li>
                  <p
                    className="register"
                    onClick={this.openRegister}
                    style={{ position: "relative" }}
                  >
                    Register
                  </p>
                  {this.state.showRegister ? (
                    <div
                      className="modal-bg"
                      onClick={e => {
                        if (e.target.className === "modal-bg") {
                          e.target.style.animation = "fadeOut 250ms";
                          setTimeout(() => {
                            this.setState({ showRegister: false });
                          }, 250);
                        }
                      }}
                    >
                      <form
                        className="register-form"
                        onSubmit={this.onRegister}
                      >
                        {" "}
                        <i
                          className="fas fa-window-close"
                          onClick={e => {
                            if (e.target.closest("div.modal-bg")) {
                              e.target.closest("div.modal-bg").style.animation =
                                "fadeOut 250ms";
                              setTimeout(() => {
                                this.setState({ showRegister: false });
                              }, 250);
                            }
                          }}
                        ></i>
                        <h3>Register</h3>
                        <label htmlFor="registerName">Name</label>
                        <input
                          name="registerName"
                          value={this.state.registerName}
                          type="text"
                          autoComplete="name"
                          onChange={this.onTextChange}
                        />
                        <label htmlFor="registerEmail">Email</label>
                        <input
                          name="registerEmail"
                          value={this.state.registerEmail}
                          type="email"
                          autoComplete="email"
                          onChange={this.onTextChange}
                        />
                        <label htmlFor="registerPassword">Password</label>
                        <input
                          name="registerPassword"
                          value={this.state.registerPassword}
                          type="password"
                          autoComplete="current-password"
                          onChange={this.onTextChange}
                        />
                        <button type="submit">Submit</button>
                        {this.props.registerError ? (
                          <p
                            style={{
                              margin: "10px 0",
                              fontFamily: "sans-serif",
                              textShadow: "none",
                              fontSize: "16px",
                              color: "#C91D2E"
                            }}
                          >
                            <i className="fas fa-exclamation-triangle"></i>{" "}
                            {this.props.registerError}
                          </p>
                        ) : null}
                      </form>
                    </div>
                  ) : null}
                </li>
                {/* END OF REGISTER BUTTOM AND FORM */}
                {/* LOGIN BUTTON AND FORM */}
                <li>
                  <p
                    className="login"
                    onClick={this.openLogin}
                    style={{ position: "relative" }}
                  >
                    Login
                  </p>
                  {this.state.showLogin ? (
                    <div
                      className="modal-bg"
                      onClick={e => {
                        if (e.target.className === "modal-bg") {
                          e.target.style.animation = "fadeOut 250ms";
                          setTimeout(() => {
                            this.setState({ showLogin: false });
                          }, 250);
                        }
                      }}
                    >
                      <form className="login-form" onSubmit={this.onLogin}>
                        <i
                          className="fas fa-window-close"
                          onClick={e => {
                            if (e.target.closest("div.modal-bg")) {
                              e.target.closest("div.modal-bg").style.animation =
                                "fadeOut 250ms";
                              setTimeout(() => {
                                this.setState({ showLogin: false });
                              }, 250);
                            }
                          }}
                        ></i>
                        <h3>Login</h3>
                        <label htmlFor="loginEmail">Email</label>
                        <input
                          name="loginEmail"
                          value={this.state.loginEmail}
                          type="email"
                          autoComplete="email"
                          onChange={this.onTextChange}
                        />
                        <label htmlFor="loginPassword">Password</label>
                        <input
                          name="loginPassword"
                          value={this.state.loginPassword}
                          type="password"
                          autoComplete="current-password"
                          onChange={this.onTextChange}
                        />
                        <button type="submit">Submit</button>
                        {this.props.loginError ? (
                          <p
                            style={{
                              margin: "10px 0",
                              fontFamily: "sans-serif",
                              textShadow: "none",
                              fontSize: "16px",
                              color: "#C91D2E"
                            }}
                          >
                            <i className="fas fa-exclamation-triangle"></i>{" "}
                            {this.props.loginError}
                          </p>
                        ) : null}
                      </form>
                    </div>
                  ) : null}
                </li>
                {/* END OF LOGIN BUTTON AND FORM */}
              </React.Fragment>
            )}
          </ul>
          <div
            className={`hamburger ${
              this.state.showHamburger ? "change" : null
            }`}
            onClick={this.handleHamburger}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </nav>
        {/* <UserSlideInNav /> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.userDetails,
  isAuthenticated: state.user.isAuthenticated,
  registerError: state.user.registerError,
  loginError: state.user.loginError
});
export default connect(
  mapStateToProps,
  { loginUser, registerUser, signoutUser }
)(Navigation);
