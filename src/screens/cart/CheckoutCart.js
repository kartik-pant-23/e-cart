import React from "react";

import _map from "lodash/map";
import _sumBy from "lodash/sumBy";

import ItemCard from "../../components/itemCard";

import styles from "./CheckoutCart.module.css";

function CheckoutCart({ cartItems, onChangeItemQuantity }) {
  const getTotalSum = () => {
    return _sumBy(cartItems, (item) => item.quantity * item.price).toFixed(2);
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Cart Items</h1>
        <div className={styles.cartItems}>
          {_map(cartItems, (item) => (
            <ItemCard
              key={item.id}
              item={item}
              onChangeItemQuantity={onChangeItemQuantity}
              showRemoveButton={true}
            />
          ))}
        </div>

        <h1 style={{ marginTop: "2rem" }}>Checkout</h1>
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>Item</th>
              <th className={styles.tableItemQuantity}>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {_map(cartItems, (item) => (
              <tr key={item.id}>
                <td className={styles.tableItemName}>{item.name}</td>
                <td className={styles.tableItemQuantity}>
                  <h2>{`x${item.quantity}`}</h2>
                </td>
                <td className={styles.tableItemPrice}>{`$${(
                  item.price * item.quantity
                ).toFixed(2)}`}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={2}>
                <h4>Total</h4>
              </td>
              <td className={styles.itemsTableTotalPrice}>
                <h2>{`$${getTotalSum()}`}</h2>
              </td>
            </tr>
          </tfoot>
        </table>

        <div className={styles.payButtonContainer}>
          <button>{`Make Payment - $${getTotalSum()}`}</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCart;
