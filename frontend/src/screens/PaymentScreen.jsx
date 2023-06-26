import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savingPaymentMethod } from '../slices/cartSlice';

//
const PaymentScreen = () => {
   //INITIALIZING
   const navigate = useNavigate();
   const dispatch = useDispatch();
   //STATES
   const [paymentMethod, setPaymentMethod] = useState('Paypal');

   //FETCHING THE STATE
   const { shippingAddress } = useSelector((state) => state.cart);

   //SUBMIT FORM HANDLER
   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savingPaymentMethod(paymentMethod));
      navigate('/placeorder');
   };

   useEffect(() => {
      if (!shippingAddress) {
         navigate('/shipping');
      }
   }, [shippingAddress, navigate]);

   //STRUCTURE
   return (
      <FormContainer>
         <CheckoutSteps step1 step2 step3 />
         <h1>Payment Method</h1>
         <Form onSubmit={submitHandler}>
            <Form.Group>
               <Form.Label as='legend'>Select Method</Form.Label>
               <Row>
                  <Col>
                     <Form.Check
                        type='radio'
                        className='my-2'
                        label='Paypal or Credit Card'
                        id='Paypal'
                        name='paymentMethod'
                        value='Paypal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                     />
                  </Col>
               </Row>
            </Form.Group>
            <Button type='submit' variant='primary' onClick={submitHandler}>
               Continuee
            </Button>
         </Form>
      </FormContainer>
   );
};

export default PaymentScreen;
