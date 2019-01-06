import React from "react";
import Form from "./reusable/Form";
import Joi from "joi-browser";
import { genres, getGenres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";
import Movie from "./Movie";

class MovieDetails extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },

    genres: [],

    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    const movie = getMovie(movieId);

    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4">
          <h1>Movie Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderSelect("genreId", "Genre", this.state.genres)}
            {this.renderInput("numberInStock", "Number in Stock")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {this.renderButton("Save")}
          </form>
        </div>
        <div className="col-md-4" />
      </div>
    );
  }
}

export default MovieDetails;
