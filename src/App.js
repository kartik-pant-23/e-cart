import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import _get from "lodash/get";
import _find from "lodash/find";
import _map from "lodash/map";
import _reject from "lodash/reject";

import Dashboard from "./screens/dashboard";
import CheckoutCart from "./screens/cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) =>
        setProducts(_map(data, (item) => ({ ...item, quantity: 0 })))
      )
      .catch((err) => console.log(err));
  }, []);

  const handleChangeItemQuantity = (itemId, quantityChange) => {
    const item = _find(products, ["id", itemId]);
    let newItem = {
      ...item,
      quantity: Math.max(0, item.quantity + quantityChange),
    };

    setProducts((prevItems) =>
      _map(prevItems, (item) => (item.id !== itemId ? item : newItem))
    );

    if (_get(newItem, "quantity") === 0) {
      setCartItems((prevItems) => _reject(prevItems, ["id", newItem.id]));
    } else if (_get(newItem, "quantity") === 1 && quantityChange === 1) {
      setCartItems((prevItems) => [newItem, ...prevItems]);
    } else {
      setCartItems((prevItems) =>
        _map(prevItems, (item) => (item.id === newItem.id ? newItem : item))
      );
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route
            index
            element={
              <Dashboard
                products={products}
                cartItems={cartItems}
                onChangeItemQuantity={handleChangeItemQuantity}
              />
            }
          />
          <Route
            path='cart'
            element={
              <CheckoutCart
                cartItems={cartItems}
                onChangeItemQuantity={handleChangeItemQuantity}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
