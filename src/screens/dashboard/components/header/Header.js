import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import _size from "lodash.size";

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

function Header({ onSearchQueryChange }) {
  const cartItems = useSelector((state) => state.cartItems);
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

  const navigate = useNavigate();
  const openCheckoutPage = () => {
    if (_size(cartItems) > 0) navigate("cart");
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
        <div className={styles.cartButton} onClick={openCheckoutPage}>
          <i className='fa-solid fa-cart-shopping fa-lg'></i> Cart
          <span className={styles.cartSize}>{_size(cartItems)}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
