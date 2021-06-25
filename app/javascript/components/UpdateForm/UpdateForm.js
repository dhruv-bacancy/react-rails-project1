import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function UpdateForm(props) {
  const [image, setImage] = useState({
    name: "",
    image_url: "",
    description: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setImage({ ...image, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(image);
    setImage({
      name: "",
      image_url: "",
      description: "",
    });
  };

  const history = useHistory();
  const clickHandler = () => {
    history.goBack();
  };

  return (
    <div className="col-md-6 shadow border rounded" style={{ float: "right", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Update Image</h3>
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
          <button
            type="button"
            className="btn btn-lg btn-secondary text-center"
            onClick={clickHandler}
            style={{marginLeft: '10px'}}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
