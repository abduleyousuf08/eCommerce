import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
   return (
      <>
         <Header />
         <main className='py-3'>
            <Container>
               <Outlet />
            </Container>
         </main>
         <Footer />
         <ToastContainer />
      </>
   );
}

export default App;
