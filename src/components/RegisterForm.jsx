import React from "react";
import Form from "./reusable/Form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },

    errors: {
      username: "",
      password: ""
    }
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username")
      .email(),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),

    name: Joi.string().label("name")
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4">
          <h1>Register Here</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        </div>
        <div className="col-md-4" />
      </div>
    );
  }
}

export default RegisterForm;
