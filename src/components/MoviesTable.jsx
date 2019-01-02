import React, { Component } from "react";
import Like from "./reusable/like";
import Table from "./reusable/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      name: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", name: "Genre" },
    { path: "numberInStock", name: "Stock" },
    { path: "dailyRentalRate", name: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
      )
    },

    {
      key: "delete",
      content: movie => {
        return (
          <button
            className="btn btn-danger"
            onClick={() => this.props.onDelete(movie._id)}
          >
            Delete
          </button>
        );
      }
    }
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
