import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../components/HomePage/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Image from "../components/Image";
import CreateForm from "../components/CreateForm/CreateForm"

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/image/:id" component={Image} />
          <Route path="/new" component={CreateForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
