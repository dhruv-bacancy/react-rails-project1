import React, { useState, useEffect } from "react";
import HomePage from "../HomePage/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Image from "../Image";
import CreateForm from "../CreateForm/CreateForm";
import Registration from "./Registration";
import Login from "./Login";
import axios from "axios";

function Authentication(props) {
  const [logStatus, setLogStatus] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
  });

  const handleLogin = (data) => {
    console.log(data);
    setLogStatus({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  };

  function checkLoginStatus() {
    axios
      .get("http://localhost:3000/api/v1/logged_in", { withCredentials: true })
      .then((resp) => {
        if (
          resp.data.logged_in &&
          logStatus.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          setLogStatus({
            loggedInStatus: "LOGGED_IN",
            user: resp.data.user,
          });
        } else if (
          !resp.data.logged_in &
          (logStatus.loggedInStatus === "LOGGED_IN")
        ) {
          setLogStatus({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    checkLoginStatus();
  }, [logStatus.loggedInStatus]);

  const handleLogout = () => {
    axios
      .delete("http://localhost:3000/api/v1/logout", { withCredentials: true })
      .then(() => {
        setLogStatus({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {},
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/authenticate"
            render={(props) => (
              <Registration
                {...props}
                loggedInStatus={logStatus.loggedInStatus}
                handleLogin={handleLogin}
                user={logStatus.user}
              />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                loggedInStatus={logStatus.loggedInStatus}
                handleLogin={handleLogin}
                user={logStatus.user}
                handleLogout={handleLogout}
              />
            )}
          />
          <Route path="/image/:id" component={Image} />
          <Route path="/new" component={CreateForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Authentication;
