import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
   Row,
   Col,
   Form,
   Card,
   ListGroup,
   Image,
   Button,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const ShoppingCart = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   //FETCHING THE DATA INSIDE THE CART TO MAP THROUGH.
   const { cartItems } = useSelector((state) => state.cart);

   //ADDING A PRODUCT TO THE CART
   const addToCartHandle = (product, qty) => {
      dispatch(addToCart({ ...product, qty }));
   };
   //REMOVING A PRODUCT FROM THE CART
   const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
   };

   //REDIRECTING TO THE SHIPPING SCREEN AND VALIDATE BEFORE IF THE USER IS LOGGED IN?
   const checkOutHandler = () => {
      navigate('/login?redirect=/shipping');
   };

   return (
      <Row>
         <Col md={8}>
            <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
               <Message>
                  Your cart is empty <Link to={'/'}>Go Back</Link>
               </Message>
            ) : (
               <ListGroup variant='flush'>
                  {cartItems.map((item) => (
                     <ListGroup.Item key={item._id}>
                        <Row>
                           <Col md={2}>
                              <Image
                                 src={item.image}
                                 alt={item.name}
                                 fluid
                                 rounded
                              />
                           </Col>
                           <Col md={3}>
                              <Link to={`/product/${item._id}`}>
                                 {item.name}
                              </Link>
                           </Col>
                           <Col md={2}>${item.price}</Col>
                           <Col md={2}>
                              <Form.Control
                                 as='select'
                                 value={item.qty}
                                 onChange={(e) =>
                                    addToCartHandle(
                                       item,
                                       Number(e.target.value)
                                    )
                                 }
                              >
                                 {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                       <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                       </option>
                                    )
                                 )}
                              </Form.Control>
                           </Col>
                           <Col md={2}>
                              <Button
                                 type='button'
                                 variant='danger'
                                 onClick={() => removeFromCartHandler(item._id)}
                              >
                                 <FaTrash color='white' />
                              </Button>
                           </Col>
                        </Row>
                     </ListGroup.Item>
                  ))}
               </ListGroup>
            )}
         </Col>
         <Col md={4}>
            <Card>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <h2>
                        Subtotal (
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        items
                     </h2>
                     $
                     {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <Button
                        type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0}
                        onClick={checkOutHandler}
                     >
                        Proceed To Checkout
                     </Button>
                  </ListGroup.Item>
               </ListGroup>
            </Card>
         </Col>
      </Row>
   );
};

export default ShoppingCart;
