import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/products";
import cartItemsReducer from "./reducers/cartItems";

export default configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartItemsReducer,
  },
});
