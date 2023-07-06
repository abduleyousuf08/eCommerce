import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

import { toast } from 'react-toastify';
import {
   useUpdateProductMutation,
   useGetProductDetailsQuery,
   useUploadProductImageMutation,
} from '../../slices/productApiSlice';

const ProductEditScreen = () => {
   const navigate = useNavigate();
   const { id: productId } = useParams();

   //STATES
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [image, setImage] = useState('');
   const [brand, setBrand] = useState('');
   const [category, setCategory] = useState('');
   const [countInStock, setCountInStock] = useState(0);
   const [description, setDescription] = useState('');

   //FETCHING ONE PRODUCT FIRST
   const {
      data: product,
      isLoading,

      error,
   } = useGetProductDetailsQuery(productId);

   //UPDATING THE PRODUCT NOW
   const [updateProduct, { isLoading: loadingUpdate, error: updateError }] =
      useUpdateProductMutation();

   const [uploadProductImage, { isLoading: loadingUpload }] =
      useUploadProductImageMutation();

   useEffect(() => {
      if (product) {
         setName(product.name);
         setPrice(product.price);
         setImage(product.image);
         setDescription(product.description);
         setCountInStock(product.countInStock);
         setBrand(product.brand);
         setCategory(product.category);
      }
   }, [product]);

   const submitHandler = async (e) => {
      e.preventDefault();
      const updatedProduct = {
         productId,
         name,
         brand,
         image,
         description,
         category,
         countInStock,
         price,
      };

      const result = await updateProduct(updatedProduct);
      if (result.error) {
         toast.error('result.error');
      } else {
         toast.success('Product updated');
         navigate('/admin/productlist');
      }
   };

   const uploadFileHandler = async (e) => {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      try {
         const res = await uploadProductImage(formData).unwrap();
         toast.success(res.message);
         setImage(res.image);
      } catch (error) {
         toast.error(error.message || error.error);
      }
   };
   return (
      <>
         <Link to='/admin/productlist' className='btn btn-light my-3'>
            Go Back
         </Link>
         {updateError && <Message variant='danger'>{updateError}</Message>}
         <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
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

                  <Form.Group controlId='price' className='my-2'>
                     <Form.Label>Price</Form.Label>
                     <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='image' className='my-2'>
                     <Form.Label>Image</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter Image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                     ></Form.Control>
                     <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadFileHandler}
                     ></Form.Control>
                     {loadingUpload && <Loader />}
                  </Form.Group>

                  <Form.Group controlId='brand' className='my-2'>
                     <Form.Label>Brand</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='countInStock' className='my-2'>
                     <Form.Label>Count-In-Stock</Form.Label>
                     <Form.Control
                        type='number'
                        placeholder='Enter count-In-Stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='category' className='my-2'>
                     <Form.Label>Category</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter Category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                     ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='description' className='my-2'>
                     <Form.Label>Description</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                     ></Form.Control>
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

export default ProductEditScreen;
