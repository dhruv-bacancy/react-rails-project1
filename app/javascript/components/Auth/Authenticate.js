import React, { useEffect } from "react";
import Registration from "./Registration";
import Login from "./Login";
import { useHistory } from "react-router-dom";

function Authenticate(props) {
  const history = useHistory();

  useEffect(() => {
    if (props.loggedInStatus === "LOGGED_IN") {
      history.push("/");
    }
  }, [props.loggedInStatus]);

  return (
    <div className="row" style={{ marginTop: "50px" }}>
      <Registration handleLogin={props.handleLogin} />

      <Login handleLogin={props.handleLogin} />
    </div>
  );
}

export default Authenticate;
