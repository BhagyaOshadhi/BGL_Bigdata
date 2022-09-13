import React, { useState } from "react";
import "./styles.css";

export const Order = (props) => {
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState();
  const [orderList, setOrderList] = useState([]);

  const onChangeHandler = (e) => {
    const id = e.target.childNodes[e.target.selectedIndex].id;
    setSelectedProductId(id);
  };
  const addOrder = () => {
    if (!selectedProductId) {
      alert("please select a product");
      return;
    }

    let product = props.productsData.filter(
      (p) => p.id == selectedProductId
    )[0];
    let orderItem = {
      productId: product.id,
      name: product.name,
      quantity: numberOfItems,
      packagingBreakdown: [],
      cost: 0,
    };
    let amount = numberOfItems;
    product.price
      .slice()
      .reverse()
      .forEach((priceBunddle, index) => {
        let qty = Object.keys(priceBunddle)[0];
        let price = Object.values(priceBunddle)[0];
        let noOfPacks = 0;

        if (amount > 0 && amount - qty >= 0) {
          do {
            noOfPacks += 1;
            amount -= qty;
            orderItem.cost += price;
          } while (amount - qty >= 0);
          orderItem.packagingBreakdown.push({ [qty]: noOfPacks });
        }
      });
    setOrderList((prev) => [...prev, orderItem]);
  };

  return (
    <>
      <h4 className="title">Order</h4>
      <div className="OrderMain" style={{ textAlign: "left" }}>
        <div style={{ display: "flex" }}>
          <h5>Product</h5>
          <select onChange={onChangeHandler}>
            <>
              <option>Select</option>
              {props.productsData.map((product, index) => (
                <option id={product.id} key={product.id}>
                  {product.name}
                </option>
              ))}
            </>
          </select>
          <h5 className="label">Quantity</h5>
          <input
            value={numberOfItems}
            className="inpt"
            onChange={(e) => {
              setNumberOfItems(e.target.value);
            }}
          />
          <button onClick={addOrder}>Add</button>
        </div>
        <h5>Summary</h5>
        <table>
          <thead>
            <tr>
              <th className="tableTopic">Product</th>
              <th className="tableTopic">Quantity</th>
              <th className="tableTopic">cost</th>
              <th className="tableTopic">Packaging Breakedown</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => (
              <tr key={index}>
                <td className="tableTopic">
                  <label>{order.name}</label>
                </td>
                <td className="tableTopic">
                  <label>{order.quantity}</label>
                </td>
                {order.productId && (
                  <>
                    <td className="tableTopic">
                      <label>{order.cost}</label>
                    </td>
                    <td>
                      {order.packagingBreakdown.map((item, index) => (
                        <p key={index}>
                          {Object.values(item)[0]} package(s) of
                          {Object.keys(item)[0]} item(s)
                        </p>
                      ))}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
