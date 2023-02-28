import React from "react";
import PropTypes from "prop-types";

import styles from "./ItemQuantityButton.module.css";

function ItemQuantityButton({ itemId, quantity, onChangeItemQuantity }) {
  const handleIncreaseItemQuantity = () => {
    onChangeItemQuantity(itemId, 1);
  };
  const handleDecreaseItemQuantity = () => {
    onChangeItemQuantity(itemId, -1);
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
