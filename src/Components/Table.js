import React from "react";

export default function Table({
  cartItems,
  handleDelete,
  handleQuantityChangeTbl,
}) {
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.netPrice * item.quantity;
    });
    return total;
  };

  const total = calculateTotal();

  return (
    <>
      <div className="tablearea">
        <table className="table mt-4 ">
          <thead>
            <tr>
              <th></th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Net Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <input
                    className="form-control"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) =>
                      handleQuantityChangeTbl(event, index, item.id)
                    }
                  />
                </td>

                <td>{item.netPrice}</td>
                <td>{item.netPrice * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    // onClick={() => handleDelete(index)}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex gap-5">
        <h1>total bill</h1>

        <button className="btn btn-primary">{total}</button>
      </div>
    </>
  );
}
