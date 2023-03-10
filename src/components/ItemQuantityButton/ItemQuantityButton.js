import React, { useCallback, useMemo } from "react";
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

  const handleIncreaseItemQuantity = useCallback(() => {
    if (quantity === 0) {
      dispatch(addItem(itemId));
    }
    dispatch(increaseItemQuantity({ id: itemId }));
  }, [dispatch, quantity, itemId]);

  const handleDecreaseItemQuantity = useCallback(() => {
    if (quantity === 1) {
      dispatch(removeItem(itemId));
    }
    dispatch(decreaseItemQuantity({ id: itemId }));
  }, [dispatch, quantity, itemId]);

  const Button = useMemo(() => {
    if (quantity === 0)
      return (
        <button
          className={styles.addToCartButton}
          onClick={handleIncreaseItemQuantity}
        >
          Add To Cart
        </button>
      );
    return (
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
    );
  }, [handleIncreaseItemQuantity, handleDecreaseItemQuantity, quantity]);

  return <div className={styles.buttonContainer}>{Button}</div>;
}

ItemQuantityButton.propTypes = {
  itemId: PropTypes.number,
  quantity: PropTypes.number,
  onChangeItemQuantity: PropTypes.func,
};

export default ItemQuantityButton;
