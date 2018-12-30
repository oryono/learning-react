import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Movie from "./Movie";
import Paginator from "./reusable/paginator";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "../components/reusable/LiistGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = movieId => {
    let movies = this.state.movies.filter(movie => {
      return movie._id !== movieId;
    });
    console.log(movies.length);
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
    console.log(genre);
    this.setState({ selectedGenre: genre });
  };
  render() {
    let { length: count } = this.state.movies;
    let {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre
    } = this.state;
    if (count === 0) {
      return (
        <div>
          <h4>There are no movies.</h4>
        </div>
      );
    }

    const filtered = selectedGenre
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h4 className="p-3">
            Showing {filtered.length} movies in the database.
          </h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => {
                return (
                  <Movie
                    key={movie._id}
                    movie={movie}
                    onDelete={this.handleDelete}
                    onLike={this.handleLike}
                  />
                );
              })}
            </tbody>
          </table>
          <Paginator
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
