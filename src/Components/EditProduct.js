import React, { Component } from "react";
import { connect } from "react-redux";
import { getWatchDetails } from "../actions/watchActions";
import { editWatch } from "../actions/adminActions";

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
    const watch = this.props.watchDetails;
    console.log(this.props);
    return (
      <div className="container" style={{ height: "auto", padding: "80px 0" }}>
        <form
          style={{ position: "relative" }}
          className="edit-form"
          onSubmit={this.onEdit}
        >
          {" "}
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
    );
  }
}

const mapStateToProps = state => ({
  watchDetails: state.watches.watchDetails,
  editError: state.watches.editError
});

export default connect(
  mapStateToProps,
  { getWatchDetails, editWatch }
)(EditProduct);
