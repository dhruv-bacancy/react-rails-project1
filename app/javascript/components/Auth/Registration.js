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
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
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
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Registration;
