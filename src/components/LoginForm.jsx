import React, { Component } from "react";
import Input from "./reusable/Input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: {
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

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("submitted");
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    if (!error) return null;
    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4">
            {" "}
            <h1>Login Form</h1>
            <form onSubmit={this.handleSubmit}>
              <Input
                name="username"
                value={account.username}
                onChange={this.handleChange}
                label="Username"
                error={errors.username}
              />

              <Input
                name="password"
                value={account.password}
                onChange={this.handleChange}
                label="Password"
                error={errors.password}
              />

              <button disabled={this.validate()} className="btn btn-success">
                Login
              </button>
            </form>
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

export default LoginForm;
