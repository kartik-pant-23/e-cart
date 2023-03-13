import { createSlice } from "@reduxjs/toolkit";

import _find from "lodash/find";
import _remove from "lodash/remove";

const slice = createSlice({
  name: "cart-items",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = _find(state, ["id", action.payload]);
      if (!item) {
        state.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      _remove(state, (id) => id === action.payload);
    },
  },
});

export const { addItem, removeItem } = slice.actions;
export default slice.reducer;
