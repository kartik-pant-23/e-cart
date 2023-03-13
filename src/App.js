import { useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import _map from "lodash.map";
import axios from "axios";

import Dashboard from "./screens/dashboard";
import CheckoutCart from "./screens/cart";
import { addItems } from "./reducers/products";

function App() {
  const dispatch = useDispatch();

  const getProductsData = useCallback(async () => {
    try {
      const response = await axios.get("/data/products.json");
      const productsList = _map(response.data, (product) => ({
        ...product,
        quantity: 0,
      }));
      dispatch(addItems(productsList));
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Dashboard />} />
          <Route path='cart' element={<CheckoutCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
