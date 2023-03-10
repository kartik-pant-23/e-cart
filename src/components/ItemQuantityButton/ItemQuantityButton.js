import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import {
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../reducers/products";
import { addItem, removeItem } from "../../reducers/cartItems";

import styles from "./ItemQuantityButton.module.css";

function ItemQuantityButton({ itemId, quantity }) {
  const dispatch = useDispatch();

  const handleIncreaseItemQuantity = () => {
    if (quantity === 0) {
      dispatch(addItem(itemId));
    }
    dispatch(increaseItemQuantity({ id: itemId }));
  };
  const handleDecreaseItemQuantity = () => {
    if (quantity === 1) {
      dispatch(removeItem(itemId));
    }
    dispatch(decreaseItemQuantity({ id: itemId }));
  };

  return (
    <div className={styles.buttonContainer}>
      {quantity === 0 ? (
        <button
          className={styles.addToCartButton}
          onClick={handleIncreaseItemQuantity}
        >
          Add To Cart
        </button>
      ) : (
        <div className={styles.quantityChangeButton}>
          <div
            className={styles.buttonDecrease}
            onClick={handleDecreaseItemQuantity}
          >
            -
          </div>
          <div className={styles.buttonQuantity}>{quantity}</div>
          <div
            className={styles.buttonIncrease}
            onClick={handleIncreaseItemQuantity}
          >
            +
          </div>
        </div>
      )}
    </div>
  );
}

ItemQuantityButton.propTypes = {
  itemId: PropTypes.number,
  quantity: PropTypes.number,
  onChangeItemQuantity: PropTypes.func,
};

export default ItemQuantityButton;
