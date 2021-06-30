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
        } else {
          console.log(resp);
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
    <div className="col shadow rounded mx-4 py-2">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Register</h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="regemail"
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
            id="regpassword"
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
            id="regpasswordconf"
            name="password_confirmation"
            value={register.password_confirmation}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Registration;
