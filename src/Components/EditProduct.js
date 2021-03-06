import React, { Component } from "react";
import { connect } from "react-redux";
import { getWatchDetails } from "../actions/watchActions";
import { editWatch } from "../actions/adminActions";
import AccessDenied from "./pages/AccessDenied";

export class EditProduct extends Component {
  state = {
    editTitle: "",
    editDescription: "",
    editQuantity: Number(),
    editPrice: Number(),
    editImagePath: ""
  };
  componentDidMount() {
    this.props.getWatchDetails(this.props.match.params.id);
    window.scrollTo(0, 0);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      editTitle: nextProps.watchDetails.title || "",
      editDescription: nextProps.watchDetails.description || "",
      editQuantity: nextProps.watchDetails.quantity || Number(),
      editPrice: nextProps.watchDetails.price || Number(),
      editImagePath: nextProps.watchDetails.image_path || ""
    });
  }
  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onEdit = e => {
    e.preventDefault();

    const editInfo = {
      title: this.state.editTitle,
      description: this.state.editDescription,
      quantity: this.state.editQuantity,
      price: this.state.editPrice,
      image_path: this.state.editImagePath
    };
    this.props.editWatch(this.props.match.params.id, editInfo);
  };

  render() {
    console.log(this.props);
    const watch = this.props.watchDetails;

    return (
      <div>
        {this.props.isAdmin ? (
          <div
            className="container"
            style={{ height: "auto", padding: "80px 0" }}
          >
            <form
              style={{ position: "relative" }}
              className="edit-form"
              onSubmit={this.onEdit}
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
              <h3>
                Product ID: <br /> {watch.id}
              </h3>
              <label htmlFor="editTitle">Product Name</label>
              <input
                name="editTitle"
                value={this.state.editTitle}
                type="text"
                onChange={this.onTextChange}
              />
              <label htmlFor="editPrice">Price</label>
              <input
                name="editPrice"
                value={this.state.editPrice}
                type="number"
                maxLength="99999"
                step=".01"
                onChange={this.onTextChange}
              />
              <label htmlFor="editDescription">Description</label>
              <input
                name="editDescription"
                value={this.state.editDescription}
                type="text"
                onChange={this.onTextChange}
              />
              <label htmlFor="editQuantity">Quantity</label>
              <input
                name="editQuantity"
                value={this.state.editQuantity}
                type="number"
                max="99999"
                step="1"
                onChange={this.onTextChange}
              />
              <label htmlFor="editImagePath">Image URL</label>
              <input
                name="editImagePath"
                value={this.state.editImagePath}
                type="text"
                onChange={this.onTextChange}
              />
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
          </div>
        ) : (
          <AccessDenied />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  watchDetails: state.watches.watchDetails,
  editError: state.watches.editError,
  isAdmin: state.user.userDetails.isadmin
});

export default connect(
  mapStateToProps,
  { getWatchDetails, editWatch }
)(EditProduct);
