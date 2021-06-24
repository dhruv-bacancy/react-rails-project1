import React from "react";

function Table(props) {
  return (
    <table className="table boarder shadow">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {props.imagesList.map((data, index) => (
          <tr>
            <th scop="row">{index+1}</th>
            <td>{data.attributes.name}</td>
            <td>
              <img
                style={{ width: "150px", height: "150px" }}
                src={data.attributes.image_url}
                alt={data.attributes.name}
              />
            </td>
            <td>{data.attributes.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
