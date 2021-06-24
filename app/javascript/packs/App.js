import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Table from "../components/Table/Table";

function App() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await axios.get("http://localhost:3000/api/v1/images.json");
    setImageData(result.data.data);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1 className="text-center">Home Page</h1>
        <Table imagesList={imageData} />
      </div>
    </div>
  );
}

export default App;
