import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { connect } from "react-redux";
import { loginUser, registerUser, signoutUser } from "../actions/userActions";

export class Navigation extends Component {
  state = {
    showHamburger: false,
    showLogin: false,
    showRegister: false,
    loginEmail: "",
    loginPassword: "",
    registerEmail: "",
    registerPassword: "",
    registerName: ""
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

    this.setState({
      loginEmail: "",
      loginPassword: ""
    });
  };
  onRegister = e => {
    e.preventDefault();

    const registerInfo = {
      name: this.state.registerName,
      email: this.state.registerEmail,
      password: this.state.registerPassword
    };

    this.props.registerUser(registerInfo);
    this.setState({
      registerEmail: "",
      registerPassword: "",
      registerName: ""
    });
  };
  render() {
    return (
      <nav className={`menu  ${this.state.showHamburger ? "change" : null} `}>
        <Link
          to="/"
          className={`logo menu ${this.state.showHamburger ? "change" : null}`}
        >
          <i className="far fa-clock"></i> <h3>Watchful</h3>
        </Link>

        <ul
          className={`nav  nav-1 menu ${
            this.state.showHamburger ? "change" : null
          }`}
        ></ul>
        <ul
          className={`nav  nav-2 menu ${
            this.state.showHamburger ? "change" : null
          }`}
        >
          {/* The follow  ternary diplays users name which links to profile if user IS logged in, or "register" and "login" if user is NOT logged in*/}

          {this.props.isAuthenticated ? (
            <React.Fragment>
              <li stlye={{ color: "white" }}>
                <p style={{ cursor: "default" }}>
                  Hello,{" "}
                  <span
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {this.props.currentUser.name}{" "}
                  </span>
                </p>
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
                    <form className="register-form" onSubmit={this.onRegister}>
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
                        onChange={this.onTextChange}
                      />
                      <label htmlFor="registerEmail">Email</label>
                      <input
                        name="registerEmail"
                        value={this.state.registerEmail}
                        type="email"
                        onChange={this.onTextChange}
                      />
                      <label htmlFor="registerPassword">Password</label>
                      <input
                        name="registerPassword"
                        value={this.state.registerPassword}
                        type="password"
                        onChange={this.onTextChange}
                      />
                      <button type="submit">Submit</button>
                      {this.state.registerMessage ? (
                        <p
                          style={{
                            margin: "10px 0",
                            fontFamily: "arial",
                            fontWeight: "bold",
                            fontSize: "17px",
                            color: "dimgray"
                          }}
                        >
                          {this.state.registerMessage}
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
                        onChange={this.onTextChange}
                      />
                      <label htmlFor="loginPassword">Password</label>
                      <input
                        name="loginPassword"
                        value={this.state.loginPassword}
                        type="password"
                        onChange={this.onTextChange}
                      />
                      <button type="submit">Submit</button>
                      {this.state.loginMessage ? (
                        <p
                          style={{
                            margin: "10px 0",
                            fontFamily: "arial",
                            fontWeight: "bold",
                            fontSize: "17px",
                            color: "dimgray"
                          }}
                        >
                          {this.state.loginMessage}
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
          className={`hamburger ${this.state.showHamburger ? "change" : null}`}
          onClick={this.handleHamburger}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.userDetails,
  isAuthenticated: state.user.isAuthenticated
});
export default connect(
  mapStateToProps,
  { loginUser, registerUser, signoutUser }
)(Navigation);
