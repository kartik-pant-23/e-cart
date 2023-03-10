import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import _map from "lodash/map";

import Dashboard from "./screens/dashboard";
import CheckoutCart from "./screens/cart";

import { addItems } from "./reducers/products";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) =>
        dispatch(addItems(_map(data, (item) => ({ ...item, quantity: 0 }))))
      )
      .catch((err) => console.log(err));
  }, [dispatch]);

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
