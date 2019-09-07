import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "../actions/userActions";

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
            {" "}
            <h3>Your Info </h3>
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
              type="password-input"
              onChange={this.onTextChange}
            />
            <button type="submit">Submit</button>
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
          <div
            style={{
              width: "100%",
              display: "flex",
              color: "white",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <h1 style={{ width: "100%" }}>Access denied, please login</h1>
          </div>
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
  { editUser }
)(UserProfile);
