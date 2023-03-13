import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import _map from "lodash.map";

import ItemCard from "../../components/itemCard";
import {
  getCartItemsTotalCost,
  getCartItemsFromProductsList,
  getItemSubtotalCost,
} from "./CheckoutCart.helper";
import styles from "./CheckoutCart.module.css";

function CheckoutCart() {
  const cartItemIds = useSelector((state) => state.cartItems);
  const products = useSelector((state) => state.products);

  const cartItems = useMemo(
    () => getCartItemsFromProductsList(products, cartItemIds),
    [cartItemIds, products]
  );

  const ItemCardsList = useMemo(
    () =>
      _map(cartItems, (item) => (
        <ItemCard key={item.id} item={item} showRemoveButton={true} />
      )),
    [cartItems]
  );

  const ItemsListTableHeader = useMemo(
    () => (
      <thead>
        <tr>
          <th>Item</th>
          <th className={styles.tableItemQuantity}>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
    ),
    []
  );

  const ItemsListTableBody = useMemo(
    () => (
      <tbody>
        {_map(cartItems, (item) => (
          <tr key={item.id}>
            <td className={styles.tableItemName}>{item.name}</td>
            <td className={styles.tableItemQuantity}>
              <h2>{`x${item.quantity}`}</h2>
            </td>
            <td className={styles.tableItemPrice}>{`$${getItemSubtotalCost(
              item
            )}`}</td>
          </tr>
        ))}
      </tbody>
    ),
    [cartItems]
  );

  const cartCost = useMemo(() => getCartItemsTotalCost(cartItems), [cartItems]);
  const ItemsListTableFooter = useMemo(
    () => (
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
    ),
    [cartCost]
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (!cartItems.length) navigate("/", { replace: true });
  }, [cartItems, navigate]);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Cart Items</h1>
        <div className={styles.cartItems}>{ItemCardsList}</div>

        <h1 style={{ marginTop: "2rem" }}>Checkout</h1>
        <table className={styles.itemsTable}>
          {ItemsListTableHeader}
          {ItemsListTableBody}
          {ItemsListTableFooter}
        </table>

        <div className={styles.payButtonContainer}>
          <button>{`Make Payment - $${cartCost}`}</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCart;
