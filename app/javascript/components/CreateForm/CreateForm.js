import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

function CreateForm() {
  const [image, setImage] = useState({
    name: "",
    image_url: "",
    description: "",
  });
  const history = useHistory();
  const handleChange = (e) => {
    e.preventDefault();
    setImage({ ...image, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios
      .post("http://localhost:3000/api/v1/images", image)
      .then((resp) => console.log(resp))
      .catch((resp) => console.log(resp));
    history.goBack();    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Image Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name For Image"
            name="name"
            value={image.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">Image Url</label>
          <input
            type="text"
            className="form-control"
            id="url"
            placeholder="Enter Url For Image"
            name="image_url"
            value={image.image_url}
            onChange={handleChange}
            required
          />
          <div className="form-group">
            <label htmlFor="desc">Image Description</label>
            <input
              type="text"
              className="form-control"
              id="desc"
              placeholder="Enter Description For Image"
              name="description"
              value={image.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="text-center" style={{ marginTop: "10px" }}>
          <button type="submit" className="btn btn-lg btn-primary text-center">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
