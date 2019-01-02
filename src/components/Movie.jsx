import React, { Component } from "react";
import Like from "./reusable/like";

class Movie extends Component {
  render() {
    const { onLike, onDelete, movie } = this.props;
    return (
      <tr>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <Like liked={movie.liked} onLike={() => onLike(movie)} />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(movie._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Movie;
