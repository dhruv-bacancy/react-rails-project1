import React, { useState } from "react";
import axios from "axios";

function Registration(props) {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/v1/registrations",
        {
          user: {
            email: register.email,
            password: register.password,
            password_confirmation: register.password_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        if (resp.data.status === "created") {
          props.handleLogin(resp.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <h2>{props.loggedInStatus}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={register.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={register.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordconf">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordconf"
            name="password_confirmation"
            value={register.password_confirmation}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Registration;
