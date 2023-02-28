import React, { useState } from "react";

import _size from "lodash/size";

import styles from "./Header.module.css";

function Header({ cartItems, onSearchQueryChange }) {
  const [searchQuery, setSearchQuery] = useState("");

  // function debounce(func, timeout = 300) {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       func.apply(this, args);
  //     }, timeout);
  //   };
  // }

  const onInputChange = (e) => {
    const newValue = e.target.value.trim();
    setSearchQuery(newValue);
    onSearchQueryChange(newValue);
    // debounce(() => onSearchQueryChange(newValue));
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
        <i className='fa-solid fa-cart-shopping fa-lg'></i> Cart
        <span className={styles.cartSize}>{_size(cartItems)}</span>
      </div>
    </div>
  );
}

export default Header;
