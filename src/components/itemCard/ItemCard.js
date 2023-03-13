import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import ItemQuantityButton from "../ItemQuantityButton";
import { removeItem as deleteItemFromCart } from "../../reducers/cartItems";
import { decreaseItemQuantity } from "../../reducers/products";
import styles from "./ItemCard.module.css";

function ItemCard({ item, showRemoveButton }) {
  const { image, name, price, description, quantity } = item;
  const dispatch = useDispatch();

  const removeItem = useCallback(() => {
    dispatch(deleteItemFromCart(item.id));
    dispatch(decreaseItemQuantity({ id: item.id, quantity: item.quantity }));
  }, [dispatch, item.id, item.quantity]);

  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <img className={styles.itemImage} src={image} alt='ItemImage' />
        <div className={styles.itemDetailsContainer}>
          <h3 className={styles.itemName}>{name}</h3>
          <h2 className={styles.itemPrice}>{`$${price}`}</h2>
          <p className={styles.itemDescription}>{description}</p>
          <ItemQuantityButton itemId={item.id} quantity={quantity} />
        </div>
      </div>

      {showRemoveButton && (
        <button onClick={removeItem} className={styles.removeButton}>
          <i className={"fa-solid fa-close fa-lg"} onClick={removeItem}></i>
        </button>
      )}
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};
ItemCard.defaultProps = {
  showRemoveButton: false,
};

export default ItemCard;
