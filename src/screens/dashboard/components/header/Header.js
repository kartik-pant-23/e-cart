import React, { useState } from "react";

import _size from "lodash/size";

import styles from "./Header.module.css";

function Header({ cartItems }) {
  return (
    <div className={styles.topNavbar}>
      <h1 className={styles.brandName}>Teketo</h1>

      <input
        className={styles.searchBar}
        type='text'
        placeholder='Search your food...'
      />

      <div className={styles.cartContainer}>
        <i className='fa-solid fa-cart-shopping fa-lg'></i> Cart
        <span className={styles.cartSize}>{_size(cartItems)}</span>
      </div>
    </div>
  );
}

export default Header;
