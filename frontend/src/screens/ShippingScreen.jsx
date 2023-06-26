import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savingShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   //TO PRE-VIEW THE DATA FROM THE LOCAL STORAGE
   const { shippingAddress } = useSelector((state) => state.cart);

   //STATES
   const [address, setAddress] = useState(shippingAddress.address || '');
   const [city, setCity] = useState(shippingAddress.city || '');
   const [postalCode, setPostalCode] = useState(
      shippingAddress.postalCode || ''
   );
   const [country, setCountry] = useState(shippingAddress.country || '');

   //SUBMITING THE FORM
   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savingShippingAddress({ address, city, postalCode, country }));
      navigate('/payment');
   };

   return (
      <FormContainer>
         <CheckoutSteps step1 step2 />
         <h1>Shipping</h1>
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='my-2'>
               <Form.Label>Address</Form.Label>
               <Form.Control
                  type='text'
                  placeholder='Enter address '
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
               ></Form.Control>
            </Form.Group>
            {/** CITY */}
            <Form.Group controlId='city' className='my-2'>
               <Form.Label>City</Form.Label>
               <Form.Control
                  type='text'
                  placeholder='Enter City '
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
               ></Form.Control>
            </Form.Group>
            {/** POSTAL CODE */}
            <Form.Group controlId='postalCode' className='my-2'>
               <Form.Label>Postal Code</Form.Label>
               <Form.Control
                  type='text'
                  placeholder='Enter Postal Code '
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
               ></Form.Control>
            </Form.Group>
            {/**COUNTRY */}
            <Form.Group controlId='country' className='my-2'>
               <Form.Label>Country</Form.Label>
               <Form.Control
                  type='text'
                  placeholder='Enter Country '
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
               ></Form.Control>
            </Form.Group>
            <Button
               type='submit'
               variant='primary'
               className='my-2'
               onClick={submitHandler}
            >
               Contine
            </Button>
         </Form>
      </FormContainer>
   );
};

export default ShippingScreen;
