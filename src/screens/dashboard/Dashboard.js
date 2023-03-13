import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import _size from "lodash.size";
import _map from "lodash.map";
import _filter from "lodash.filter";

import Header from "./components/header";
import ItemCard from "../../components/itemCard";
import EmptyList from "./components/emptyList";
import styles from "./Dashboard.module.css";
import { getItemsMatchingSearchQuery } from "./Dashboard.helper";

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

  useEffect(() => {
    let itemsList = vegOnlyFilter ? _filter(products, "vegetarian") : products;
    itemsList = getItemsMatchingSearchQuery(itemsList, searchQuery);
    setItems(itemsList);
  }, [products, vegOnlyFilter, searchQuery]);

  const ItemsList = useMemo(() => {
    if (_size(items))
      return _map(items, (item) => <ItemCard key={item.id} item={item} />);
    else return <EmptyList />;
  }, [items]);

  return (
    <div>
      <Header onSearchQueryChange={handleSearchQueryChange} />

      <div className={styles.content}>
        <h1 className={styles.pageTitle}>
          Teketo
          <span className={styles.brandTag}>
            Your Favourite Food, Your Favourite Place
          </span>
        </h1>

        <div className={styles.filterContainer}>
          Filter:
          <input
            type='checkbox'
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
