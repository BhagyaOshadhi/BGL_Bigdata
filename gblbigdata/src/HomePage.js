import React, { useState, useEffect } from "react";
import { Data } from "./Data";
import "./styles.css";

export const HomePage = () => {
  const [productsData, setProductsData] = useState(Data);

  const [newProduct, setNewProduct] = useState({
    code: "",
    name: "",
    price: [{ 1: "" }],
  });

  const handleNewproduct = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      console.log(name, value);
      setNewProduct((prev) => ({ ...prev, [name]: [{ 1: value }] }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const displayTable = () => {
    const dataTable = productsData.map((product, index) => (
      <tr key={index}>
        <td>{product.code}</td>
        <td>{product.name}</td>
        <td>
          {product.price.map((bundle, index) => (
            <p key={index}>
              {Object.keys(bundle)[0]} for ${Object.values(bundle)[0]}
            </p>
          ))}
        </td>
      </tr>
    ));
    return (
      <table>
        <thead>
          <tr>
            <th className="tableHead">Code</th>
            <th className="tableHead">Name</th>
            <th className="tableHead">Price</th>
          </tr>
        </thead>
        <tbody>{dataTable}</tbody>
      </table>
    );
  };
  return (
    <>
      <h1>GBL Bigdata</h1>
      {displayTable()}
      <h4 className="title">Add Product</h4>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setProductsData((prev) => [...prev, newProduct]);
        }}
      >
        <input
          className="inpt"
          placeholder="enter product code"
          value={newProduct.code}
          name="code"
          onChange={handleNewproduct}
        />
        <input
          className="inpt"
          placeholder="enter product name"
          value={newProduct.name}
          name="name"
          onChange={handleNewproduct}
        />

        <input
          className="priceInpt"
          placeholder="enter product price"
          value={Object.values(newProduct.price[0])[0]}
          name="price"
          onChange={handleNewproduct}
        />

        <input type="submit" value="Add" />
      </form>
    </>
  );
};
