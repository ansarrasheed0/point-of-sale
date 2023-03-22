import React, { useState } from "react";
import Products from "./ProductsApi";
import Table from "./Table";

export default function AddItem() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [netPrice, setNetPrice] = useState("");
  const [maxv, setMaxv] = useState("1");
  const [cartItems, setCartItems] = useState([]);

  const handleProductSelect = (event) => {
    const Id = event.target.value;

    setProductId(Id);

    let productId = parseInt(Id);
    const [product] = Products.filter((obj) => {
      return obj.id === productId;
    });

    setMaxv(product.qty);
    setProductName(product.name);
    setNetPrice(product.price);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    if (parseInt(newQuantity) === maxv) {
      alert("You Excced the stock ...! ");
    }
    setQuantity(newQuantity);
  };

  const handleClear = () => {
    setProductId("");
    setProductName("");
    setQuantity("1");
    setNetPrice("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const item = {
      id: productId,
      name: productName,
      quantity: quantity,
      netPrice: netPrice,
    };

    // check if the item already exists in the cart
    const index = cartItems.findIndex((cartItem) => {
      return cartItem.id === productId;
    });

    if (index !== -1) {
      // item already exists, update quantity
      const updatedCartItems = [...cartItems];
      const totalQuantity =
        parseInt(cartItems[index].quantity) + parseInt(quantity);

      if (totalQuantity > maxv) {
        alert("You exceeded the stock!");
        updatedCartItems[index].quantity = maxv;
      } else {
        updatedCartItems[index].quantity = totalQuantity.toString();
      }

      setCartItems(updatedCartItems);

      handleClear();
    } else {
      // item doesn't exist, add new item
      if (parseInt(quantity) > maxv) {
        alert("You exceeded the stock!");
        setQuantity(maxv);
      } else {
        setCartItems([...cartItems, item]);
        handleClear();
      }
    }
    setMaxv(1);
  };

  // function handleDelete(index) {
  //   const newCartItems = [...cartItems];
  //   newCartItems.splice(index, 1);
  //   setCartItems(newCartItems);
  // }
  function handleDelete(id) {
    const newCartItems = [...cartItems];
    const updateitems = newCartItems.filter((i) => i.id !== id);
    setCartItems(updateitems);
  }
  const handleQuantityChangeTbl = (event, index, nid) => {
    const { value } = event.target;
    const updatedCartItems = [...cartItems];
    const [pr] = Products.filter((f) => f.id === parseInt(nid));

    if (parseInt(value) <= pr.qty) {
      updatedCartItems[index].quantity = parseInt(value);
      setCartItems(updatedCartItems);
    } else {
      alert(`you have ${pr.qty} total stock so please enter in range :`);
    }
  };
  return (
    <div>
      <div className="bg-info p-4 additem">
        <form className="row g-3 align-items-center" onSubmit={handleSubmit}>
          <div className="col-auto">
            <select
              className="form-select"
              value={productId}
              onChange={handleProductSelect}
              required
            >
              <option value="" disabled hidden>
                Select a product
              </option>
              {Products.map((product, index) => (
                <option value={product.id} key={index}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <input
              className="form-control"
              type="text"
              value={productName}
              placeholder="Name"
              disabled
            />
          </div>
          <div className="col-auto">
            <input
              className="form-control"
              type="number"
              value={quantity}
              min="1"
              max={maxv}
              placeholder="Quantity"
              onChange={handleQuantityChange}
            />
          </div>
          <div className="col-auto">
            <input
              className="form-control"
              type="text"
              value={netPrice}
              placeholder="Net Price"
              disabled
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <Table
        cartItems={cartItems}
        handleDelete={handleDelete}
        handleQuantityChangeTbl={handleQuantityChangeTbl}
      />
    </div>
  );
}
