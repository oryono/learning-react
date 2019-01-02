import React from "react";

const MovieDetails = ({ match, history }) => {
  return (
    <div>
      <h1>Movie details</h1>
      <div>{match.params.id}</div>
      <button
        className="btn btn-success"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieDetails;
