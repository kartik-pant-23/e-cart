import _sumBy from "lodash.sumby";
import _round from "lodash.round";
import _map from "lodash.map";
import _find from "lodash.find";

export function getCartItemsFromProductsList(products, cartItemIds) {
  const productsList = _map(cartItemIds, (id) => _find(products, ["id", id]));
  return productsList;
}

export function getItemSubtotalCost(item) {
  return _round(item.price * item.quantity, 2);
}

export function getCartItemsTotalCost(cartItems) {
  const totalPrice = _sumBy(cartItems, (item) => item.price * item.quantity);
  return _round(totalPrice, 2);
}
