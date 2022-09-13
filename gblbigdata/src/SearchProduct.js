import React, { useEffect, useState } from "react";

export const SearchProduct = (props) => {
  const [searchedProduct, setSearchedProduct] = useState({
    id: 0,
    name: "",
    code: "",
    price: [],
  });
  const [inputText, setInputText] = useState("");
  const [searchedProductPriceArray, setSearchedProductPriceArray] = useState(
    []
  );
  const [isAddBuddle, setIisAddBuddle] = useState(false);
  const [newPriceBuddle, setNewPriceBuddle] = useState({ 0: 0 });
  const [filteredData, setFilteredData] = useState([]);

  const inputTextHandler = (e) => {
    const lowercaseText = e.target.value.toLowerCase();
    setInputText(lowercaseText);
  };

  const FilterData = () => {
    setFilteredData(() =>
      props.productsData.filter((el) => {
        if (inputText === "") {
          return null;
        } else {
          return el.name.toLowerCase().includes(inputText);
        }
      })
    );
  };

  useEffect(() => {
    FilterData();
  }, [inputText]);

  const updateSearchedProduct = () => {
    setSearchedProduct((prev) => ({
      ...prev,
      price: searchedProductPriceArray,
    }));
  };

  const updateProductData = () => {
    props.productsData.map((product, index) => {
      if (product.id === searchedProduct.id) {
        const temporyArr = [...props.productsData];
        temporyArr[searchedProduct.id - 1] = searchedProduct;
        props.setProductsData(temporyArr);
      }
    });
    setInputText("");
    setSearchedProduct({
      id: 0,
      name: "",
      code: "",
      price: [],
    });
  };

  useEffect(() => {
    updateSearchedProduct();
  }, [searchedProductPriceArray]);

  let newQuantity = Object.keys(newPriceBuddle)[0];
  let newPrice = Object.values(newPriceBuddle)[0];
  return (
    <div className="serchMain">
      <div style={{ display: "flex" }}>
        <label>search product to update</label>
        <input
          onChange={inputTextHandler}
          placeholder="search product"
          className="btn"
        />
      </div>

      {searchedProduct.name === "" ? (
        <ul>
          {filteredData.map((item) => (
            <li
              className="btn"
              key={item.id}
              onClick={() => {
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
          <div style={{ textAlign: "left", display: "flex" }}>
            <h4>name</h4>
            <input
              value={searchedProduct.name}
              onChange={(e) => {
                setSearchedProduct((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
          </div>
          <div style={{ textAlign: "left", display: "flex" }}>
            <h4>code</h4>
            <input
              value={searchedProduct.code}
              onChange={(e) => {
                setSearchedProduct((prev) => ({
                  ...prev,
                  code: e.target.value,
                }));
              }}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>quantity</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {searchedProductPriceArray.map((priceBuddle, index) => {
                let bunddleQuantity = Object.keys(priceBuddle)[0];
                let bunddlePrice = Object.values(
                  searchedProductPriceArray[index]
                )[0];

                return (
                  <tr key={index}>
                    <td>{bunddleQuantity}</td>
                    <td>{bunddlePrice}</td>
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
          <div style={{ textAlign: "left", display: "flex" }}>
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
                  placeholder="quantity"
                  value={newQuantity}
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
                    setNewPriceBuddle({ [newQuantity]: e.target.value });
                  }}
                />
                <input type="submit" name="Add" />
              </form>
            ) : null}
          </div>
          <div>
            <button
              className="updatePdctBtn"
              onClick={() => {
                updateProductData();
              }}
            >
              Update Product
            </button>
          </div>
        </>
      )}
    </div>
  );
};
