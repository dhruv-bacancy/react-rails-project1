import React, { useState } from "react";
import axios from "axios";

function Login(props) {
  const [log, setLog] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/v1/sessions",
        {
          user: {
            email: log.email,
            password: log.password,
          },
        },
        { withCredentials: true }
      )
      .then((resp) => {
        // console.log(resp);
        if (resp.data.logged_in) {
          props.handleLogin(resp.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setLog({ ...log, [event.target.name]: event.target.value });
  };

  return (
    <div className="col shadow rounded mx-4 py-2">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={log.email}
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
            value={log.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
