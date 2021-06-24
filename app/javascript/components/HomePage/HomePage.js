import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../Table/Table";

function HomePage() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/images.json")
    .then(response => {
      setImageData(response.data.data);
    });
  }, []);

  return (
    <div className="py-4">
      <h1 className="text-center">Home Page</h1>
      <Table imagesList={imageData} />
    </div>
  );
}

export default HomePage;