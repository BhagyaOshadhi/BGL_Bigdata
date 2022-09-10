import React, { useState } from "react";
import { Data } from "./Data";

export const SearchProduct = () => {
  const [searchedProduct, setSearchedProduct] = useState({
    name: "",
    code: "",
    price: [],
  });
  const [inputText, setInputText] = useState("");
  const [updatedProductIndex, setUpdatedProductIndex] = useState(0);
  const [searchedProductPriceArray, setSearchedProductPriceArray] = useState(
    []
  );
  const [isAddBuddle, setIisAddBuddle] = useState(false);
  const [newPriceBuddle, setNewPriceBuddle] = useState({ 0: 0 });

  const inputTextHandler = (e) => {
    const lowercaseText = e.target.value.toLowerCase();
    setInputText(lowercaseText);
  };

  const filteredData = Data.filter((el) => {
    if (inputText === "") {
      return null;
    } else {
      return el.name.toLowerCase().includes(inputText);
    }
  });
  let newQuontity = Object.keys(newPriceBuddle)[0];
  let newPrice = Object.values(newPriceBuddle)[0];
  return (
    <>
      <input
        onChange={inputTextHandler}
        placeholder="search product"
        className="btn"
      />
      {searchedProduct.name === "" ? (
        <ul>
          {filteredData.map((item, index) => (
            <li
              className="btn"
              key={index}
              onClick={() => {
                setUpdatedProductIndex(index);
                setSearchedProduct(item);
                setSearchedProductPriceArray(item.price);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <h4 className="btn">{searchedProduct.name}</h4>
          <input
            value={searchedProduct.name}
            onChange={(e) => {
              setSearchedProduct((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <h4 className="btn">{searchedProduct.code}</h4>
          <input
            value={searchedProduct.code}
            onChange={(e) => {
              setSearchedProduct((prev) => ({
                ...prev,
                code: e.target.value,
              }));
            }}
          />

          <table>
            <thead>
              <tr>
                <th>quontity</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {searchedProductPriceArray.map((priceBuddle, index) => {
                let buddleQuontity = Object.keys(priceBuddle)[0];
                let buddlePrice = Object.values(
                  searchedProductPriceArray[index]
                )[0];

                return (
                  <tr key={index}>
                    <td>{buddleQuontity}</td>
                    <td>{buddlePrice}</td>
                    <td>
                      <button
                        onClick={() => {
                          setSearchedProductPriceArray(
                            searchedProductPriceArray.filter(
                              (item, itemIndex) => itemIndex !== index
                            )
                          );
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            onClick={() => {
              setIisAddBuddle(true);
            }}
          >
            + buddle
          </button>
          {isAddBuddle === true ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchedProductPriceArray((prev) => [
                  ...prev,
                  {
                    [Object.keys(newPriceBuddle)[0]]: parseFloat(
                      Object.values(newPriceBuddle)[0]
                    ),
                  },
                ]);
              }}
            >
              <input
                placeholder="quontity"
                value={newQuontity}
                ß
                onChange={(e) => {
                  setNewPriceBuddle({
                    [e.target.value]: [newPrice],
                  });
                }}
              />
              <input
                placeholder="price"
                value={newPrice}
                onChange={(e) => {
                  setNewPriceBuddle({ [newQuontity]: e.target.value });
                }}
              />
              <input type="submit" name="Add" />
            </form>
          ) : null}
        </>
      )}
    </>
  );
};
