import React, { useState, useEffect, Fragment } from "react";
import HomePage from "../HomePage/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Image from "../Image";
import CreateForm from "../CreateForm/CreateForm";
import Authenticate from "./Authenticate";
import axios from "axios";
import NoPageFound from "../NoPageFound/NoPageFound";

function Authentication() {
  const [logStatus, setLogStatus] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
  });

  const csrfToken = document.querySelector("[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

  const handleLogin = (data) => {
    setLogStatus({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  };

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
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route
            path="/authenticate"
            render={(props) => (
              <Authenticate
                {...props}
                loggedInStatus={logStatus.loggedInStatus}
                handleLogin={handleLogin}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <HomePage
                {...props}
                loggedInStatus={logStatus.loggedInStatus}
                handleLogout={handleLogout}
              />
            )}
          />

          <Route
            exact
            path="/image/:id"
            render={(props) => (
              <Image
                {...props}
                loggedInStatus={logStatus.loggedInStatus}
                handleLogout={handleLogout}
              />
            )}
          />
          <Route
            exact
            path="/new"
            render={(props) => (
              <CreateForm
                {...props}
                loggedInStatus={logStatus.loggedInStatus}
                handleLogout={handleLogout}
              />
            )}
          />
          <Route path="*" component={NoPageFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Authentication;
