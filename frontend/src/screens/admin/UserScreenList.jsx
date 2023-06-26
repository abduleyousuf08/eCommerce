import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaTimes, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import {
   useGetUsersQuery,
   useDeleteUserMutation,
} from '../../slices/usersApiSlice';

const UserScreenList = () => {
   const { data: users, refetch, isLoading, error } = useGetUsersQuery();
   const [
      deleteUser,
      { isLoading: deleting, error: deleteError },
   ] = useDeleteUserMutation();

   const deleteHandler = async (userId) => {
      if (window.confirm('are you sure you ?')) {
         try {
            const res = await deleteUser(userId).unwrap();
            refetch();
            toast.success(res.data.Message);
         } catch (error) {
            toast.error(error.data.Message || error.error);
         }
      }
   };
   return (
      <>
         <h1>Users</h1>
         {deleteError && <Message variant='danger'>{deleteError}</Message>}
         {isLoading || deleting ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <Table striped hover responsive className='table-sm'>
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>NAME</th>
                     <th>EMAIL</th>
                     <th>ADMIN</th>

                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => (
                     <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>
                           <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>

                        <td>
                           {user.isAdmin ? (
                              <FaCheck style={{ color: 'green' }} />
                           ) : (
                              <FaTimes style={{ color: 'red' }} />
                           )}
                        </td>

                        <td>
                           <LinkContainer to={`/admin/user/${user._id}/edit`}>
                              <Button variant='light'>
                                 <FaEdit />
                              </Button>
                           </LinkContainer>

                           <Button
                              variant='danger'
                              className='btn-sm mx-3'
                              onClick={() => deleteHandler(user._id)}
                           >
                              <FaTrash style={{ color: 'white' }} />
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         )}
      </>
   );
};

export default UserScreenList;
