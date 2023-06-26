export const addDecimals = (num) => {
   return Math.round(num * 100) / 100;
};

export const updateCart = (state) => {
   //Calculating items price
   state.itemsPrice = addDecimals(
      state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
   );
   //Calculating  shipping price
   state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
   // Calculating tax price
   state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
   // Calculating the total price
   state.total = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
   ).toFixed(2);

   //Setting to the localStorage
   localStorage.setItem('cart', JSON.stringify(state));
   return state;
};
