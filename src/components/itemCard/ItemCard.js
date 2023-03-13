import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import ItemQuantityButton from "../ItemQuantityButton";

import { removeItem as deleteItemFromCart } from "../../reducers/cartItems";
import { decreaseItemQuantity } from "../../reducers/products";
import styles from "./ItemCard.module.css";

function ItemCard({ item, showRemoveButton = false }) {
  const dispatch = useDispatch();

  const removeItem = useCallback(() => {
    dispatch(deleteItemFromCart(item.id));
    dispatch(decreaseItemQuantity({ id: item.id, quantity: item.quantity }));
  }, [dispatch, item.id, item.quantity]);

  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <img className={styles.itemImage} src={item.image} alt='ItemImage' />
        <div className={styles.itemDetailsContainer}>
          <h3 className={styles.itemName}>{item.name}</h3>
          <h2 className={styles.itemPrice}>{`$${item.price}`}</h2>
          <p className={styles.itemDescription}>{item.description}</p>
          <ItemQuantityButton itemId={item.id} quantity={item.quantity} />
        </div>
      </div>

      {showRemoveButton && (
        <i
          className={`fa-solid fa-close fa-lg ${styles.removeButton}`}
          onClick={removeItem}
        ></i>
      )}
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object,
  showRemoveButton: PropTypes.bool,
};

export default ItemCard;
