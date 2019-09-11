import React, { Component } from "react";
import { connect } from "react-redux";

import { createWatch } from "../actions/adminActions";
import AccessDenied from "./pages/AccessDenied";

export class AddProduct extends Component {
  state = {
    newTitle: "",
    newDescription: "",
    newQuantity: Number(),
    newPrice: Number(),
    newImagePath: ""
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCreateProduct = e => {
    e.preventDefault();

    const newInfo = {
      title: this.state.newTitle,
      description: this.state.newDescription,
      quantity: this.state.newQuantity,
      price: this.state.newPrice,
      image_path: this.state.newImagePath
    };
    this.props.createWatch(newInfo, this.props.history);
  };

  render() {
    return (
      <div>
        {this.props.isAdmin ? (
          <div
            className="container"
            style={{ height: "auto", padding: "80px 0" }}
          >
            <form
              style={{ position: "relative" }}
              className="create-form"
              onSubmit={this.onCreateProduct}
            >
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
                onClick={() => this.props.history.push("/products-admin")}
              ></i>{" "}
              <h3>Create New Watch</h3>
              <label htmlFor="newTitle">Product Name</label>
              <input
                name="newTitle"
                value={this.state.newTitle}
                type="text"
                onChange={this.onTextChange}
              />
              <label htmlFor="newPrice">Price</label>
              <input
                name="newPrice"
                value={this.state.newPrice}
                type="number"
                maxLength="99999"
                step=".01"
                onChange={this.onTextChange}
              />
              <label htmlFor="newDescription">Description</label>
              <input
                name="newDescription"
                value={this.state.newDescription}
                type="text"
                onChange={this.onTextChange}
              />
              <label htmlFor="newQuantity">Quantity</label>
              <input
                name="newQuantity"
                value={this.state.newQuantity}
                type="number"
                min="1"
                max="99999"
                step="1"
                onChange={this.onTextChange}
              />
              <label htmlFor="newImagePath">Image URL</label>
              <input
                name="newImagePath"
                value={this.state.newImagePath}
                type="text"
                onChange={this.onTextChange}
              />
              <button type="submit">Add</button>
              {this.props.createError ? (
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
                  {this.props.createError}
                </p>
              ) : null}
            </form>
          </div>
        ) : (
          <AccessDenied />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  createError: state.watches.createError,
  isAdmin: state.user.userDetails.isadmin
});

export default connect(
  mapStateToProps,
  { createWatch }
)(AddProduct);
