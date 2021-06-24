import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../components/HomePage/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Image from "../components/Image";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/image/:id" component={Image} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
