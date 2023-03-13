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
    if (!quantity) {
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

  const ItemQuantitySelector = useMemo(() => {
    if (quantity)
      return (
        <div className={styles.quantityChangeButton}>
          <button
            className={styles.buttonDecrease}
            onClick={handleDecreaseItemQuantity}
          >
            -
          </button>
          <div className={styles.buttonQuantity}>{quantity}</div>
          <button
            className={styles.buttonIncrease}
            onClick={handleIncreaseItemQuantity}
          >
            +
          </button>
        </div>
      );
    return (
      <button
        className={styles.addToCartButton}
        onClick={handleIncreaseItemQuantity}
      >
        Add To Cart
      </button>
    );
  }, [handleIncreaseItemQuantity, handleDecreaseItemQuantity, quantity]);

  return <div className={styles.buttonContainer}>{ItemQuantitySelector}</div>;
}

ItemQuantityButton.propTypes = {
  itemId: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ItemQuantityButton;
