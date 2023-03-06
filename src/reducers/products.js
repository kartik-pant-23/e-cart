import { createSlice } from "@reduxjs/toolkit";

import _find from "lodash/find";
import _get from "lodash/get";

const slice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addItems: (state, action) => {
      const productsList = action.payload;
      state.push(...productsList);
    },
    increaseItemQuantity: (state, action) => {
      const item = _find(state, ["id", _get(action, ["payload", "id"])]);
      const quantity = Math.abs(_get(action, ["payload", "quantity"], 1));
      if (item !== undefined) {
        item.quantity += quantity;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const item = _find(state, ["id", _get(action, ["payload", "id"])]);
      const quantity = Math.abs(_get(action, ["payload", "quantity"], 1));
      if (item !== undefined) {
        item.quantity -= Math.min(item.quantity, quantity);
      }
    },
  },
});

export const { addItems, increaseItemQuantity, decreaseItemQuantity } =
  slice.actions;
export default slice.reducer;
