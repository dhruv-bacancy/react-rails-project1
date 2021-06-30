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

  const handleLogoutClick = () => {
    props.handleLogout();
  };

  console.log(props.user);
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default Login;
