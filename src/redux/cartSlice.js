import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const act = action.payload;
      const product = act.product.attributes;
      const qty = act.qty;
      const curItem = product
        ? {
            title: product.title,
            key: product.key,
            price: product.price,
            image: product.image.data.attributes.url,
          }
        : act.product;
      //   console.log(curItem);
      const index = state.cart.findIndex((item) => item.key === curItem.key);
      if (index === -1) {
        state.cart.push({ ...curItem, quantity: qty });
      } else {
        state.cart[index].quantity += qty;
      }

      console.log(state.cart);
    },
    removeFromCart: (state, action) => {
      const curItemKey = action.payload?.attributes?.key || action.payload.key;

      const index = state.cart.findIndex((item) => item.key === curItemKey);
      if (index == -1) return;
      if (state.cart[index].quantity === 1) {
        state.cart = state.cart.filter((item) => item.key !== curItemKey);
      } else {
        state.cart[index].quantity -= 1;
      }
    },
    resetCart: (state, action) => {
      state.cart = [];
    },
    removeItem: (state, action) => {
      const curItemKey = action.payload?.attributes?.key || action.payload.key;

      state.cart = state.cart.filter((item) => item.key !== curItemKey);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, resetCart, removeItem } =
  cartSlice.actions;
