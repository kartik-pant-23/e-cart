import React from "react";
import PropTypes from "prop-types";

import _map from "lodash/map";

import Header from "./components/header";
import ItemCard from "./components/itemCard";

import styles from "./Dashboard.module.css";

function Dashboard({ products, cartItems, onChangeItemQuantity }) {
  return (
    <div>
      <Header cartItems={cartItems} />

      <div className={styles.content}>
        <h1 className={styles.pageTitle}>
          Teketo&nbsp;
          <span className={styles.brandTag}>
            Your Favourite Food, Your Favourite Place
          </span>
        </h1>

        {_map(products, (item) => (
          <ItemCard
            key={item.id}
            item={item}
            onChangeItemQuantity={onChangeItemQuantity}
          />
        ))}
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  cartItems: PropTypes.arrayOf(PropTypes.object),
  onChangeItemQuantity: PropTypes.func,
};

export default Dashboard;
