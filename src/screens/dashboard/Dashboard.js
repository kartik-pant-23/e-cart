import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import _size from "lodash.size";
import _map from "lodash.map";
import _get from "lodash.get";
import _filter from "lodash.filter";
import _includes from "lodash.includes";
import _lowerCase from "lodash.lowercase";

import Header from "./components/header";
import ItemCard from "../../components/itemCard";
import EmptyList from "./components/emptyList";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);

  const products = useSelector((state) => state.products);

  const handleSearchQueryChange = (newValue) => {
    setSearchQuery(newValue);
  };

  const handleVegOnlyFilterChange = () => {
    setVegOnlyFilter((prev) => !prev);
  };

  const filterProducts = useCallback(
    (product) => {
      return (
        _includes(_lowerCase(_get(product, "name")), _lowerCase(searchQuery)) ||
        _includes(
          _lowerCase(_get(product, "description")),
          _lowerCase(searchQuery)
        )
      );
    },
    [searchQuery]
  );

  useEffect(() => {
    const itemsList = vegOnlyFilter
      ? _filter(products, "vegetarian")
      : products;
    setItems(_filter(itemsList, filterProducts));
  }, [products, filterProducts, vegOnlyFilter]);

  const ItemsList = useMemo(() => {
    if (_size(items) > 0)
      return _map(items, (item) => <ItemCard key={item.id} item={item} />);
    else return <EmptyList />;
  }, [items]);

  return (
    <div>
      <Header onSearchQueryChange={handleSearchQueryChange} />

      <div className={styles.content}>
        <h1 className={styles.pageTitle}>
          Teketo&nbsp;
          <span className={styles.brandTag}>
            Your Favourite Food, Your Favourite Place
          </span>
        </h1>

        <div className={styles.filterContainer}>
          Filter:&nbsp;
          <input
            type='checkbox'
            name='vegOnly'
            id='vegOnly'
            checked={vegOnlyFilter}
            onChange={handleVegOnlyFilterChange}
          />
          Veg Only
        </div>

        {ItemsList}
      </div>
    </div>
  );
}

export default Dashboard;
