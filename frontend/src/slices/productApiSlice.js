import { PRODUCTS_URL, UPLOADS_URL } from '../constants';
import { apiSlice } from './apiSlices';

export const productsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: ({ pageNumber, keyword }) => ({
            url: PRODUCTS_URL,
            params: {
               pageNumber,
               keyword,
            },
         }),
         // si aynan u refresh garayn page ka automatically ayaynu u refresh garaynayana sidan
         providesTags: ['Product'],
         /* Waa in loo shego RTKQ in ay xogta sii hayso ila 5s hadii component ku qaato  */
         keepUnusedDataFor: 5,
      }),

      /* HERE */
      getProductDetails: builder.query({
         query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`,
         }),

         keepUnusedDataFor: 5,
      }),
      /**HERE */
      createProduct: builder.mutation({
         query: () => ({
            url: PRODUCTS_URL,
            method: 'POST',
         }),
         invalidatesTags: ['Product'],
      }),
      /**HERE */
      updateProduct: builder.mutation({
         query: (data) => ({
            url: `${PRODUCTS_URL}/${data.productId}`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['Product'],
      }),
      /**HERE */
      uploadProductImage: builder.mutation({
         query: (data) => ({
            url: UPLOADS_URL,
            method: 'POST',
            body: data,
         }),
      }),
      /**HERE */
      deleteProduct: builder.mutation({
         query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Product'],
      }),
      /**HERE */
      createReviews: builder.mutation({
         query: (data) => ({
            url: `${PRODUCTS_URL}/${data.productId}/reviews`,
            method: 'POST',
            body: data,
         }),
         invalidatesTags: ['Product'],
      }),
      /**HERE */
      getTopProducts: builder.query({
         query: () => ({
            url: `${PRODUCTS_URL}/top`,
            method: 'GET',
         }),
         keepUnusedDataFor: 5,
      }),
   }),
});

export const {
   useGetProductsQuery,
   useGetProductDetailsQuery,
   useCreateProductMutation,
   useUpdateProductMutation,
   useUploadProductImageMutation,
   useDeleteProductMutation,
   useCreateReviewsMutation,
   useGetTopProductsQuery,
} = productsApiSlice;
