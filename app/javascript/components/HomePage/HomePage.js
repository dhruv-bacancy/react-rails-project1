import React, { useState, useEffect, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Table from "../Table/Table";

function HomePage(props) {
  const history = useHistory();
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    if (props.loggedInStatus === "NOT_LOGGED_IN") {
      history.push("/authenticate");
    } else if (props.loggedInStatus === "LOGGED_IN") {
      axios.get("http://localhost:3000/api/v1/images.json").then((response) => {
        setImageData(response.data.data);
      });
    }
  }, [props.loggedInStatus]);

  const deleteHandler = (id) => {
    setImageData(imageData.filter((img) => img.id != id));
    axios
      .delete(`http://localhost:3000/api/v1/images/${id}`)
      .then((resp) => console.log(resp))
      .catch((resp) => console.log(resp));
  };

  return (
    <Fragment>
      <div className="py-4">
        <h1 className="text-center">Home Page</h1>
        <Table imagesList={imageData} deleteHandler={deleteHandler} />
      </div>
      <Link
        type="button"
        to="/new"
        style={{
          position: "fixed",
          right: "30px",
          bottom: "30px",
          float: "right",
          zIndex: "1000",
          textDecoration: "none",
        }}
        className="btn btn-success"
      >
        New
      </Link>
      <Link
        type="button"
        style={{
          position: "fixed",
          right: "30px",
          bottom: "80px",
          float: "right",
          zIndex: "1000",
          textDecoration: "none",
        }}
        className="btn btn-danger"
        onClick={props.handleLogout}
      >
        Logout
      </Link>
    </Fragment>
  );
}

export default HomePage;
