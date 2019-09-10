import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getWatches } from "../actions/watchActions";
import { deleteWatch } from "../actions/adminActions";

export class ProductsAdmin extends Component {
  state = {
    sortedWatches: [],
    sortWatchKeyword: ""
  };

  componentDidMount() {
    this.props.getWatches();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      sortedWatches: nextProps.watches
    });
  }

  onChange = e => {
    const options = e.target.value.split(",");
    this.setState({ [e.target.name]: options });
  };

  sortWatches = e => {
    e.preventDefault();

    let newSortedWatches;
    let property = this.state.sortWatchKeyword[0];
    let order = this.state.sortWatchKeyword[1];
    if (!property) return;
    if (order === "asc") {
      newSortedWatches = this.state.sortedWatches.sort((a, b) =>
        a[property] > b[property] ? 1 : -1
      );
    } else {
      newSortedWatches = this.state.sortedWatches.sort((a, b) =>
        a[property] < b[property] ? 1 : -1
      );
    }

    this.setState({
      sortedWatches: newSortedWatches
    });
  };

  render() {
    return (
      <div
        style={{
          background: "linear-gradient(to bottom, #000000, #434343)",
          height: "100%",

          padding: "100px 0",
          color: "#333"
        }}
      >
        <form
          style={{
            margin: "0 auto",
            width: "300px",
            color: "white",
            textAlign: "center"
          }}
          className="sort-products"
          onSubmit={this.sortWatches}
        >
          <label>Sort By:</label>
          <select
            style={{
              textTransform: "uppercase",
              backgroundColor: "white",
              display: "block",
              fontSize: "15px",
              margin: "15px auto",
              border: "none",
              height: "30px",
              outline: "none"
            }}
            name="sortWatchKeyword"
            value={this.state.sortWatchKeyword}
            onChange={this.onChange}
          >
            <option value="" disabled hidden>
              Choose an option
            </option>
            <option value={["price", "asc"]}>Price - Ascending</option>
            <option value={["price", "desc"]}>Price - Descending</option>
            <option value={["title", "asc"]}>Title - Ascending </option>
            <option value={["title", "desc"]}>Title - Descending</option>
            <option value={["quantity", "asc"]}>Quantity - Ascending </option>
            <option value={["quantity", "desc"]}>Quantity - Descending</option>
          </select>
          <button style={{ margin: "15px auto" }}>SORT</button>
        </form>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          {this.state.sortedWatches.map(cur => (
            <div
              key={cur.id}
              style={{
                margin: "10px",
                textAlign: "center",
                borderRadius: "5px",
                backgroundColor: "white",
                position: "relative"
              }}
            >
              <i
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete product: ${cur.title}`
                    )
                  ) {
                    this.props.deleteWatch(cur.id);
                  } else {
                    return;
                  }
                }}
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  padding: "10px",
                  cursor: "pointer",
                  left: "0",
                  color: "rgb(228,81,90)"
                }}
                className="far fa-trash-alt"
              ></i>
              <Link to={`/products-admin/${cur.id}`}>
                <i
                  style={{
                    position: "absolute",
                    fontSize: "20px",
                    padding: "10px",
                    cursor: "pointer",
                    right: "0",
                    color: "coral"
                  }}
                  className="far fa-edit"
                ></i>
              </Link>
              <img src={cur.image_path} alt={cur.description} height="150" />
              <div style={{ padding: "10px" }}>
                <h4>
                  <b>{cur.title}</b>
                </h4>
                <p>
                  <i className="fas fa-dollar-sign"></i> {cur.price} |{" "}
                  <i>Stock: {cur.quantity} </i>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  watches: state.watches.watches
});
export default connect(
  mapStateToProps,
  { getWatches, deleteWatch }
)(ProductsAdmin);
