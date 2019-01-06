import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Paginator from "./reusable/paginator";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "../components/reusable/LiistGroup";
import MoviesTable from "./MoviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "desc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movieId => {
    let movies = this.state.movies.filter(movie => {
      return movie._id !== movieId;
    });
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    let {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    let { length: count } = this.state.movies;
    let { currentPage, pageSize, sortColumn } = this.state;
    if (count === 0) {
      return (
        <div>
          <h4>There are no movies.</h4>
        </div>
      );
    }

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="container">
        {" "}
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link to="movies/new" className="btn btn-info">
              New Movie
            </Link>
            <h4 className="p-3">
              Showing {totalCount} movies in the database.
            </h4>
            <MoviesTable
              movies={movies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Paginator
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
