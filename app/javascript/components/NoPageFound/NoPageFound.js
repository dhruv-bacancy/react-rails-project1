import React from "react";
import { Link } from "react-router-dom";
import NoPage from "../../../assets/images/404.jpg";

function NoPageFound() {
  return (
    <div className="text-center">
      <img src={NoPage} />
      <p>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
}

export default NoPageFound;
