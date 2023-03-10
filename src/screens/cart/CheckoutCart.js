import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import _map from "lodash/map";
import _find from "lodash/find";
import _sumBy from "lodash/sumBy";
import _round from "lodash/round";

import ItemCard from "../../components/itemCard";

import styles from "./CheckoutCart.module.css";

function CheckoutCart() {
  const cartItemIds = useSelector((state) => state.cartItems);
  const products = useSelector((state) => state.products);

  let cartItems = useMemo(
    () => _map(cartItemIds, (itemId) => _find(products, ["id", itemId])),
    [cartItemIds, products]
  );

  let cartCost = useMemo(
    () =>
      _round(
        _sumBy(cartItems, (item) => item.price * item.quantity),
        2
      ),
    [cartItems]
  );

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Cart Items</h1>
        <div className={styles.cartItems}>
          {_map(cartItems, (item) => (
            <ItemCard key={item.id} item={item} showRemoveButton={true} />
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
                <h2>{`$${cartCost}`}</h2>
              </td>
            </tr>
          </tfoot>
        </table>

        <div className={styles.payButtonContainer}>
          <button>{`Make Payment - $${cartCost}`}</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCart;
