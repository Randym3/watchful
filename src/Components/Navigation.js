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

    axios
      .post("https://watchful-rm-api.herokuapp.com/api/auth", loginInfo)
      .then(res => {
        const token = res.headers["x-auth-token"];
        localStorage.setItem("jwtToken", token);

        this.setState({
          loginMessage: ` Welcome ${res.data.name}`,
          loginEmail: "",
          loginPassword: ""
        });
      })
      .catch(err => {
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
      .post("https://watchful-rm-api.herokuapp.com/api/users", registerInfo)
      .then(res => {
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
        this.setState({ registerMessage: err.response.data });
      });
    this.setState({ registerPassword: "" });
  };
  render() {
    return (
      <nav className={`menu  ${this.state.showHamburger ? "change" : null} `}>
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
