import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { removeCredentials } from '../slices/authSlice';
import Loader from './Loader';
import SearchBox from './SearchBox';

import logo from '../assets/logo.png';
//
const Header = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { cartItems } = useSelector((state) => state.cart);
   const { userInfo } = useSelector((state) => state.auth);

   const [logout, { isLoading }] = useLogoutMutation();

   const logOutHandler = async () => {
      try {
         await logout().unwrap();
         dispatch(removeCredentials());
         navigate('/login');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
         <Container>
            <LinkContainer to='/'>
               <Navbar.Brand>
                  <img src={logo} alt='' />
                  ProShop
               </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
               <Nav className='ms-auto'>
                  <SearchBox />
                  <LinkContainer to='/cart'>
                     <Nav.Link>
                        <FaShoppingCart /> Cart
                        {cartItems.length > 0 && (
                           <Badge
                              pill
                              bg='danger'
                              style={{ marginLeft: '5px' }}
                           >
                              {cartItems.reduce((a, c) => a + c.qty, 0)}
                           </Badge>
                        )}
                     </Nav.Link>
                  </LinkContainer>
                  {userInfo ? (
                     <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                           <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logOutHandler}>
                           Logout
                           {isLoading && <Loader />}
                        </NavDropdown.Item>
                     </NavDropdown>
                  ) : (
                     <LinkContainer to='/login'>
                        <Nav.Link>
                           <FaUser />
                           Sign in
                        </Nav.Link>
                     </LinkContainer>
                  )}
                  {userInfo && userInfo.isAdmin && (
                     <NavDropdown title='Admin' id='adminmenu'>
                        <LinkContainer to='/admin/productlist'>
                           <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/userlist'>
                           <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderlist'>
                           <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                     </NavDropdown>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Header;
