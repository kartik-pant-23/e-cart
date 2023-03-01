import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import _size from "lodash/size";

import styles from "./Header.module.css";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function Header({ cartItems, onSearchQueryChange }) {
  const [searchQuery, setSearchQuery] = useState("");

  const debounceCB = useMemo(
    () => debounce(onSearchQueryChange, 300),
    [onSearchQueryChange]
  );

  const onInputChange = (e) => {
    const newValue = e.target.value.trim();
    setSearchQuery(newValue);
    debounceCB(newValue);
  };

  return (
    <div className={styles.topNavbar}>
      <h1 className={styles.brandName}>Teketo</h1>

      <input
        className={styles.searchBar}
        type='text'
        placeholder='Search your food...'
        value={searchQuery}
        onChange={onInputChange}
      />

      <div className={styles.cartContainer}>
        <Link className={styles.cartButton} to='/cart'>
          <i className='fa-solid fa-cart-shopping fa-lg'></i> Cart
          <span className={styles.cartSize}>{_size(cartItems)}</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
