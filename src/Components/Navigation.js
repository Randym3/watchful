import React, { Component } from "react";
import "./Navigation.css";
import axios from "axios";
export class Navigation extends Component {
  state = {
    showHamburger: false,
    showLogin: false,
    showRegister: false,
    loginEmail: "",
    loginPassword: "",
    loginMessage: "",
    registerEmail: "",
    registerPassword: "",
    registerName: "",
    registerMessage: ""
  };
  toggleLoginMenu = e => {
    this.setState({ showLogin: !this.state.showLogin });
  };
  toggleRegisterMenu = e => {
    this.setState({ showRegister: !this.state.showRegister });
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

    axios
      .post("http://localhost:6677/api/auth", loginInfo)
      .then(res => {
        console.log(res);
        const token = res.headers["x-auth-token"];
        localStorage.setItem("jwtToken", token);

        this.setState({
          loginMessage: ` Welcome ${res.data.name}`,
          loginEmail: "",
          loginPassword: ""
        });
      })
      .catch(err => {
        console.log(err.response);
        this.setState({ loginMessage: err.response.data });
      });
    this.setState({ loginPassword: "" });
  };
  onRegister = e => {
    e.preventDefault();

    const registerInfo = {
      name: this.state.registerName,
      email: this.state.registerEmail,
      password: this.state.registerPassword
    };

    axios
      .post("http://localhost:6677/api/users", registerInfo)
      .then(res => {
        console.log(res);
        const token = res.headers["x-auth-token"];
        localStorage.setItem("jwtToken", token);

        this.setState({
          registerMessage: ` Welcome ${res.data.name}`,
          registerEmail: "",
          registerPassword: "",
          registerName: ""
        });
      })
      .catch(err => {
        console.log(err.response);
        this.setState({ registerMessage: err.response.data });
      });
    this.setState({ registerPassword: "" });
  };
  render() {
    return (
      <nav
        className={`menu wow fadeInDown ${
          this.state.showHamburger ? "change" : null
        } `}
      >
        <a
          className={`logo menu ${this.state.showHamburger ? "change" : null}`}
          href="/"
        >
          <i className="far fa-clock"></i> <h3>Watchful</h3>
        </a>

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
          <li>
            <p
              className="register"
              onClick={this.toggleRegisterMenu}
              style={{ position: "relative" }}
            >
              Register
            </p>
            {this.state.showRegister ? (
              <form className="register-form" onSubmit={this.onRegister}>
                <h3>Register</h3>
                <input
                  name="registerName"
                  value={this.state.registerName}
                  type="text"
                  placeholder="Name"
                  onChange={this.onTextChange}
                />
                <input
                  name="registerEmail"
                  value={this.state.registerEmail}
                  type="email"
                  placeholder="Email"
                  onChange={this.onTextChange}
                />
                <input
                  name="registerPassword"
                  value={this.state.registerPassword}
                  type="password"
                  placeholder="Password"
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
            ) : null}
          </li>
          <li>
            <p
              className="login"
              onClick={this.toggleLoginMenu}
              style={{ position: "relative" }}
            >
              Login
            </p>
            {this.state.showLogin ? (
              <form className="login-form" onSubmit={this.onLogin}>
                <h3>Login</h3>
                <input
                  name="loginEmail"
                  value={this.state.loginEmail}
                  type="email"
                  placeholder="Email"
                  onChange={this.onTextChange}
                />
                <input
                  name="loginPassword"
                  value={this.state.loginPassword}
                  type="password"
                  placeholder="Password"
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
            ) : null}
          </li>
          <li>
            <a href="/">
              <i className="fas fa-shopping-cart"></i>
            </a>
          </li>
          <li>
            <a href="/">
              <i className="fas fa-search"></i>
            </a>
          </li>
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

export default Navigation;
