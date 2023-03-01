import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import _size from "lodash/size";
import _map from "lodash/map";
import _get from "lodash/get";
import _filter from "lodash/filter";
import _includes from "lodash/includes";
import _lowerCase from "lodash/lowerCase";

import Header from "./components/header";
import ItemCard from "../../components/itemCard";
import EmptyList from "./components/emptyList";

import styles from "./Dashboard.module.css";

function Dashboard({ products, cartItems, onChangeItemQuantity }) {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (newValue) => {
    setSearchQuery(newValue);
  };

  useEffect(() => {
    setItems(
      _filter(
        products,
        (product) =>
          _includes(
            _lowerCase(_get(product, "name")),
            _lowerCase(searchQuery)
          ) ||
          _includes(
            _lowerCase(_get(product, "description")),
            _lowerCase(searchQuery)
          )
      )
    );
  }, [products, searchQuery]);

  return (
    <div>
      <Header
        cartItems={cartItems}
        onSearchQueryChange={handleSearchQueryChange}
      />

      <div className={styles.content}>
        <h1 className={styles.pageTitle}>
          Teketo&nbsp;
          <span className={styles.brandTag}>
            Your Favourite Food, Your Favourite Place
          </span>
        </h1>

        {_size(items) === 0 && <EmptyList />}

        {_size(items) > 0 &&
          _map(items, (item) => (
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
