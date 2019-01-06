import React from "react";
import Joi from "joi-browser";
import Form from "./reusable/Form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },

    errors: {
      username: "",
      password: ""
    }
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4">
            {" "}
            <h1>Login Form</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

export default LoginForm;
