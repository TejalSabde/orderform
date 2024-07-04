import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.name === action.payload.name
      );
      if (itemPresent) {
        itemPresent.quantity = itemPresent.minQty;
      } else {
        state.cart.push({ ...action.payload, quantity: action.payload.minQty });
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.name !== action.payload.name
      );
      state.cart = removeItem;
    },
    incementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.name === action.payload.name
      );
      itemPresent.quantity+= itemPresent.minQty;
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.name === action.payload.name
      );
      if (itemPresent.quantity === action.payload.minQty) {
        itemPresent.quantity = 0;
        const removeItem = state.cart.filter(
          (item) => item.name !== action.payload.name
        );
        state.cart = removeItem;
      } else {
        itemPresent.quantity-=itemPresent.minQty;
      }
    },
    cleanCart:(state) => {
        state.cart = [];
    }
  },
});


export const {addToCart,removeFromCart,incementQuantity,decrementQuantity,cleanCart} = CartSlice.actions;

export default CartSlice.reducer