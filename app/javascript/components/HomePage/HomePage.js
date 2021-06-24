import React, { useState, useEffect } from "react";
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
    <div className="py-4">
      <h1 className="text-center">Home Page</h1>
      <Table imagesList={imageData} deleteHandler={deleteHandler} />
    </div>
  );
}

export default HomePage;
