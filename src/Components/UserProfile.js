import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser, deleteUser } from "../actions/userActions";
import AccessDenied from "./pages/AccessDenied";

import "./UserProfile.css";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEmail: "",
      editPassword: "",
      editName: ""
    };
  }
  componentDidMount() {
    window.scroll(0, 0);
    const name = this.props.currentUser.name ? this.props.currentUser.name : "";
    const email = this.props.currentUser.email
      ? this.props.currentUser.email
      : "";
    this.setState({
      editName: name,
      editEmail: email
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const name = nextProps.currentUser.name ? nextProps.currentUser.name : "";
    const email = nextProps.currentUser.email
      ? nextProps.currentUser.email
      : "";

    this.setState({
      editName: name,
      editEmail: email
    });
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      this.props.deleteUser();
    } else {
      return;
    }
  };

  onEdit = e => {
    e.preventDefault();

    const editInfo = {
      name: this.state.editName,
      email: this.state.editEmail,
      password: this.state.editPassword
    };
    this.props.editUser(editInfo);
  };

  render() {
    return (
      <div className="container">
        {this.props.isAuthenticated ? (
          <form className="edit-form" onSubmit={this.onEdit}>
            <i
              className="fas fa-long-arrow-alt-left"
              style={{
                cursor: "pointer",
                position: "absolute",
                left: "2%",
                top: "12%",
                padding: "0 10px",
                fontSize: "45px",
                color: "white",
                backgroundColor: "coral",
                borderRadius: "1px",
                textShadow: "0 2px 2px black",
                boxShadow: "0 2px 2px black"
              }}
              onClick={() => this.props.history.push("/")}
            ></i>{" "}
            <h3>
              {" "}
              <i className="fas fa-user-edit"></i> Your Info
            </h3>
            <label htmlFor="editName">Name</label>
            <input
              name="editName"
              value={this.state.editName}
              type="text"
              onChange={this.onTextChange}
            />
            <label htmlFor="editEmail">Email</label>
            <input
              name="editEmail"
              value={this.state.editEmail}
              type="email"
              onChange={this.onTextChange}
            />
            <label htmlFor="editPassword">Password</label>
            <input
              name="editPassword"
              value={this.state.editPassword}
              type="password"
              autoComplete="on"
              onChange={this.onTextChange}
            />
            <h3>
              {" "}
              <i
                onClick={this.onDelete}
                style={{
                  padding: "5px 10px 5px 0",
                  color: "red",
                  cursor: "pointer",
                  fontSize: "20px"
                }}
                className="fas fa-trash-alt"
              ></i>{" "}
              Delete Account
            </h3>
            <button type="submit">Edit</button>
            {this.props.editError ? (
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
                {this.props.editError}
              </p>
            ) : null}
          </form>
        ) : (
          <AccessDenied />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.userDetails,
  isAuthenticated: state.user.isAuthenticated,
  editError: state.user.editError
});

export default connect(
  mapStateToProps,
  { editUser, deleteUser }
)(UserProfile);
