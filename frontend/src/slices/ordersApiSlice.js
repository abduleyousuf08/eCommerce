import { ORDERS_URL, PAYPAL_URL } from '../constants';
import { apiSlice } from './apiSlices';

export const ordersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      createOrder: builder.mutation({
         query: (order) => ({
            url: ORDERS_URL,
            method: 'POST',
            body: { ...order },
         }),
      }),
      /**HERE */
      getOrderDetails: builder.query({
         query: (orderId) => ({
            url: `${ORDERS_URL}/${orderId}`,
            method: 'GET',
         }),
         keepUnusedDataFor: 5,
      }),
      /**HERE */
      payOrder: builder.mutation({
         query: ({ orderId, details }) => ({
            url: `${ORDERS_URL}/${orderId}/pay`,
            method: 'PUT',
            body: details,
         }),
      }),
      getPayPalClientId: builder.query({
         query: () => ({
            url: PAYPAL_URL,
         }),
         keepUnusedDataFor: 5,
      }),
      /**HERE */
      getMyOrders: builder.query({
         query: () => ({
            url: `${ORDERS_URL}/mine`,
            method: 'GET',
         }),
         keepUnusedDataFor: 5,
      }),
      /**HERE */
      getAllOrders: builder.query({
         query: () => ({
            url: ORDERS_URL,
            method: 'GET',
         }),
         keepUnusedDataFor: 5,
      }),
      /**HERE */
      deliverOrder: builder.mutation({
         query: (orderId) => ({
            url: `${ORDERS_URL}/${orderId}/deliver`,
            method: 'PUT',
         }),
      }),
      /**HERE*/
   }),
});

export const {
   useCreateOrderMutation,
   useGetOrderDetailsQuery,
   usePayOrderMutation,
   useGetPayPalClientIdQuery,
   useGetMyOrdersQuery,
   useGetAllOrdersQuery,
   useDeliverOrderMutation,
} = ordersApiSlice;
