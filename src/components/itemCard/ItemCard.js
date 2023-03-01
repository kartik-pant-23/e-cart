import React from "react";
import PropTypes from "prop-types";

import styles from "./ItemCard.module.css";

import ItemQuantityButton from "../ItemQuantityButton";

function ItemCard({ item, onChangeItemQuantity, showRemoveButton = false }) {
  const removeItem = () => {
    onChangeItemQuantity(item.id, -item.quantity);
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <img className={styles.itemImage} src={item.image} alt='ItemImage' />
        <div className={styles.itemDetailsContainer}>
          <h3 className={styles.itemName}>{item.name}</h3>
          <h2 className={styles.itemPrice}>{`$${item.price}`}</h2>
          <p className={styles.itemDescription}>{item.description}</p>
          <ItemQuantityButton
            itemId={item.id}
            quantity={item.quantity}
            onChangeItemQuantity={onChangeItemQuantity}
          />
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
  onChangeItemQuantity: PropTypes.func,
};

export default ItemCard;
