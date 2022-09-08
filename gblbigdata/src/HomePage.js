import React from "react";
import { Data } from "./Data";
import "./styles.css";

export const HomePage = () => {
  const displayTable = () => {
    const dataTable = Data.map((product) => (
      <tr >
        <td >{product.code}</td>
        <td >{product.name}</td>
        <td >
          {product.price.map((bundle) => (
            <p>
              {Object.keys(bundle)[0]} for $ {Object.values(bundle)[0]}
            </p>
          ))}
        </td>
      </tr>
    ));
    return (
      <div>
        <thead>
          <tr >
            <th className="tableHead">Code</th>
            <th className="tableHead">Name</th>
            <th className="tableHead">Price</th>
          </tr>
        </thead>
        <tbody>{dataTable}</tbody>
      </div>
    );
  };
  return (
    <>
      <h1>GBL Bigdata</h1>
      {displayTable()}
    </>
  );
};
