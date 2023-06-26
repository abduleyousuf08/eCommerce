import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlices';

const usersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/login`,
            method: 'POST',
            body: data,
         }),
      }),
      /** HERE */
      register: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}`,
            method: 'POST',
            body: data,
         }),
      }),
      /*HERE*/
      logout: builder.mutation({
         query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST',
         }),
      }),
      /**HERE */
      profile: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/profile`,
            method: 'PUT',
            body: data,
         }),
      }),
      /**HERE */
      getUsers: builder.query({
         query: () => ({
            url: USERS_URL,
            method: 'GET',
         }),
         providesTags: ['User'],
         keepUnusedDataFor: 5,
      }),
      /**HERE */
      deleteUser: builder.mutation({
         query: (userId) => ({
            url: `${USERS_URL}/${userId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['User'],
      }),
      /**HERE */
      getUserDetails: builder.query({
         query: (userId) => ({
            url: `${USERS_URL}/${userId}`,
            method: 'GET',
         }),
         providesTags: ['User'],
         keepUnusedDataFor: 5,
      }),
      /**HERE */
      updateUser: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/${data.userId}`,
            method: 'PUT',
            body: data,
         }),
         invalidatesTags: ['User'],
      }),
   }),
});

export const {
   useLoginMutation,
   useLogoutMutation,
   useRegisterMutation,
   useProfileMutation,
   useGetUsersQuery,
   useDeleteUserMutation,
   useGetUserDetailsQuery,
   useUpdateUserMutation,
} = usersApiSlice;
