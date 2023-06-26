import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
   useGetUserDetailsQuery,
   useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
   const navigate = useNavigate();
   const { id: userId } = useParams();

   //STATES
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [isAdmin, setIsAdmin] = useState(false);

   //FETCHING THE USER DATA FIRST
   const { data: user, refetch, isLoading, error } = useGetUserDetailsQuery(
      userId
   );

   //UPDATE USER DATA NOW
   const [
      updateUser,
      { isLoading: updating, error: updateError },
   ] = useUpdateUserMutation();

   useEffect(() => {
      if (user) {
         setName(user.name);
         setEmail(user.email);
         setIsAdmin(user.isAdmin);
      }
   }, [user]);

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         await updateUser({
            userId,
            name,
            email,
            isAdmin,
         }).unwrap();
         toast.success('User Updated successfully');
         refetch();
         navigate('/admin/userList');
      } catch (error) {
         toast.error(error.error);
      }
   };

   return (
      <>
         <Link to='/admin/userList' className='btn btn-light my-3'>
            Go Back
         </Link>
         {updateError && <Message variant='danger'>{updateError}</Message>}
         <FormContainer>
            <h1>Edit User</h1>
            {updating && <Loader />}
            {isLoading ? (
               <Loader />
            ) : error ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name' className='my-2'>
                     <Form.Label>Name</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='email' className='my-2'>
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='image' className='my-2'>
                     <Form.Check
                        type='checkbox'
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                     ></Form.Check>
                  </Form.Group>

                  <Button type='submit' variant='primary' nclassName='my-2'>
                     Update
                  </Button>
               </Form>
            )}
         </FormContainer>
      </>
   );
};

export default UserEditScreen;
