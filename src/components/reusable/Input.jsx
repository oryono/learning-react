import React from "react";

const Input = ({ name, label, vale, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type="text"
        id={name}
        className="form-control"
        value={vale}
        onChange={onChange}
      />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
