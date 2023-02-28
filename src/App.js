import { useEffect, useState } from "react";

import _get from "lodash/get";
import _map from "lodash/map";
import _reject from "lodash/reject";

import Dashboard from "./screens/dashboard";

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
    let newItem;
    setProducts((prevItems) =>
      _map(prevItems, (item) => {
        if (item.id !== itemId) return item;
        newItem = {
          ...item,
          quantity: Math.max(0, item.quantity + quantityChange),
        };
        return newItem;
      })
    );

    if (_get(newItem, "quantity") === 0) {
      setCartItems((prevItems) => _reject(prevItems, ["id", newItem.id]));
    } else if (_get(newItem, "quantity") === 1) {
      setCartItems((prevItems) => [newItem, ...prevItems]);
    } else {
      setCartItems((prevItems) =>
        _map(prevItems, (item) => (item.id === newItem.id ? newItem : item))
      );
    }
  };

  return (
    <Dashboard
      products={products}
      cartItems={cartItems}
      onChangeItemQuantity={handleChangeItemQuantity}
    />
  );
}

export default App;
