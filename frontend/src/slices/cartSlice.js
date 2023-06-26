import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
   ? JSON.parse(localStorage.getItem('cart'))
   : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' };

const cartSlice = createSlice({
   name: 'Cart',
   initialState: initialState,
   reducers: {
      addToCart: (state, action) => {
         const item = action.payload;

         const existItem = state.cartItems.find((x) => x._id === item._id);

         if (existItem) {
            state.cartItems = state.cartItems.map((x) =>
               x._id === existItem._id ? item : x
            );
         } else {
            state.cartItems = [...state.cartItems, item];
         }

         return updateCart(state);
      },

      /* HERE  */
      removeFromCart: (state, action) => {
         state.cartItems = state.cartItems.filter(
            (x) => x._id !== action.payload
         );

         return updateCart(state);
      },
      /* HERE  */
      savingShippingAddress: (state, action) => {
         state.shippingAddress = action.payload;
         return updateCart(state);
      },
      /**HERE */
      savingPaymentMethod: (state, action) => {
         state.paymentMethod = action.payload;
         return updateCart(state);
      },
      /*HERE*/
      clearCartItems: (state, action) => {
         state.cartItems = [];
         return updateCart(state);
      },
   },
});

export const {
   addToCart,
   removeFromCart,
   savingShippingAddress,
   savingPaymentMethod,
   clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
