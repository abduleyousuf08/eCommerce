import React from 'react';
import { Card, Ratio } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

//
const Product = ({ product }) => {
   return (
      <Card className='my-3 p-3 rounded'>
         <Link to={`/product/${product._id}`}>
            <Ratio aspectRatio='4x3'>
               <Card.Img
                  src={product.image}
                  className='ratio ratio-21x9'
                  variant='top'
               />
            </Ratio>
         </Link>

         <Card.Body>
            <Link to={`/product/${product._id}`}>
               <Card.Title as='div' className='product-title'>
                  <strong>{product.name}</strong>
               </Card.Title>
            </Link>
            <Card.Text>
               <Rating
                  value={product.rating}
                  text={`${product.numReviews} Reviews`}
               />
            </Card.Text>

            <Card.Text as='h3'>$ {product.price}</Card.Text>
         </Card.Body>
      </Card>
   );
};

export default Product;
