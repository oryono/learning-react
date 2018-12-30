import React, { Component } from "react";
import Like from "./reusable/like";

class Movie extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.movie.title}</td>
        <td>{this.props.movie.genre.name}</td>
        <td>{this.props.movie.numberInStock}</td>
        <td>{this.props.movie.dailyRentalRate}</td>
        <td>
          <Like
            liked={this.props.movie.liked}
            onLike={() => this.props.onLike(this.props.movie)}
          />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.props.onDelete(this.props.movie._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Movie;
