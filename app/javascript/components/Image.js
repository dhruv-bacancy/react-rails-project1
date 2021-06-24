import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { auto } from "async";

function Image(props) {
  const [image, setImage] = useState({ length: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;
    const url = `http://localhost:3000/api/v1/images/${id}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setImage(response.data.data);
        setIsLoaded(true);
      })
      .catch((response) => console.log(response));
  }, []);

  return (
    <Fragment>
      {isLoaded && (
        <div
          className="card text-center shadow container"
          style={{width: '350px', marginTop: '50px'}}
          >
          <div className="text-center">
          <img
            className="card-img-top"
            src={image.attributes.image_url}
            alt={image.attributes.name}
            style={{width: '300px', height: '300px', marginTop: '10px'}}
          />
          </div>
          <div className="card-body">
            <h5 className="card-title">{image.attributes.name}</h5>
            <p className="card-text">{image.attributes.description}</p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Image;
