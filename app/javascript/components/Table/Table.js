import React from "react";
import { useHistory } from 'react-router-dom';
import "./Table.css"

function Table(props) {

  const history = useHistory();
  const trash = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-trash"
      viewBox="0 0 16 16"
    >
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
      <path
        fillRule="evenodd"
        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
      />
    </svg>
  );

  const deleteHandler = (event,id) => {
    // event.preventDefault();
    event.stopPropagation();
    props.deleteHandler(id);
  };

  const clickHandler = (id) => {
    history.push(`/image/${id}`);
  };

  return (
    <table className="table boarder shadow table-hover table-responsive">
      <thead className="table-dark text-center">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Description</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.imagesList.map((data, index) => (
          <tr key={index} onClick={() => clickHandler(data.id)}>
            <th scop="row" className="text-center">{index + 1}</th>
            <td>{data.attributes.name}</td>
            <td className="text-center">
              <img
                style={{ width: "150px", height: "150px" }}
                src={data.attributes.image_url}
                alt={data.attributes.name}
                id="img"
              />
            </td>
            <td>{data.attributes.description}</td>
            <td className="text-center">
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={(event) => deleteHandler(event,data.id)}
              >
                {trash}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
