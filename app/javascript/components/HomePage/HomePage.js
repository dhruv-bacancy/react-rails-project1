import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "../Table/Table";

function HomePage() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/images.json").then((response) => {
      setImageData(response.data.data);
    });
  }, []);

  const deleteHandler = (id) => {
    setImageData(imageData.filter((img) => img.id != id));
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
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
        to='/new'
        style={{
          position: "fixed",
          right: "30px",
          bottom: "30px",
          float: "right",
          zIndex: "1000",
          textDecoration: 'none'
        }}
        className="btn btn-success"
      >
        New
      </Link>
    </Fragment>
  );
}

export default HomePage;
