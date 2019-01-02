import React, { Component } from "react";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./components/Customers";
import NotFound from "./components/NotFound";
import Rentals from "./components/Rentals";
import MovieDetails from "./components/MovieDetails";
import LoginForm from "./components/LoginForm";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieDetails} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
