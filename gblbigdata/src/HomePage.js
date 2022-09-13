import React, { useState, useEffect } from "react";
import { Data } from "./Data";
import "./styles.css";
import { SearchProduct } from "./SearchProduct";
import { Order } from "./Oder";

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
      setNewProduct((prev) => ({ ...prev, [name]: [{ 1: value }] }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const displayTable = () => {
    const dataTable =
      productsData &&
      productsData.map((product, index) => (
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

          <button
            style={{ padding: "15px" }}
            onClick={() => {
              setProductsData(
                productsData.filter((prd, prdIndex) => prdIndex !== index)
              );
            }}
          >
            Delete
          </button>
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
          let lastProductIdx = productsData.length - 1;
          if (lastProductIdx > 0) {
            newProduct.id = productsData[lastProductIdx].id + 1;
          } else {
            newProduct.id = 1;
          }
          setProductsData((prev) => [...prev, newProduct]);
        }}
      >
        <div style={{ textAlign: "left" }}>
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
        </div>
      </form>
      <h4 className="title">Search and Update Product</h4>
      {productsData && (
        <>
          <SearchProduct
            productsData={productsData}
            setProductsData={setProductsData}
          />
          <Order productsData={productsData} />
        </>
      )}
    </>
  );
};
