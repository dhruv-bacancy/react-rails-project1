import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UpdateForm from "./UpdateForm/UpdateForm";

function Image(props) {
  const history = useHistory();
  const [image, setImage] = useState({
    name: "",
    image_url: "",
    description: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [noData, setNoData] = useState(false);

  const csrfToken = document.querySelector("[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

  useEffect(() => {
    if (props.loggedInStatus === "NOT_LOGGED_IN") {
      history.push("/authenticate");
    } else {
      const id = props.match.params.id;
      const url = `http://localhost:3000/api/v1/images/${id}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data.present == false) {
            setNoData(true);
          } else {
            setImage(response.data.data.attributes);
            setIsLoaded(true);
          }
        })
        .catch((response) => console.log(response));
    }
  }, [props.loggedInStatus]);

  const handleSubmit = (e) => {
    setImage(e);
    const id = props.match.params.id;
    const url = `http://localhost:3000/api/v1/images/${id}`;
    axios
      .put(url, e)
      .then((resp) => console.log(resp))
      .catch((resp) => console.log(resp));
  };

  if (noData) {
    return (
      <h1 className="alert alert-danger mt-5" role="alert">
        No Data Present
      </h1>
    );
  }

  return (
    <Fragment>
      {isLoaded && <UpdateForm handleSubmit={handleSubmit} />}
      {isLoaded && (
        <div className="col-md-6">
          <div
            className="card shadow text-center bg-dark text-white"
            style={{ width: "350px", marginTop: "120px" }}
          >
            <div className="text-center">
              <img
                className="card-img-top"
                src={image.image_url}
                alt={image.name}
                style={{ width: "300px", height: "300px", marginTop: "10px" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{image.name}</h5>
              <p className="card-text">{image.description}</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Image;
