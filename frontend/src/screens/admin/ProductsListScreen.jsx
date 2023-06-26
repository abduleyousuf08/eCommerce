import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import {
   useGetProductsQuery,
   useCreateProductMutation,
   useDeleteProductMutation,
} from '../../slices/productApiSlice';

const ProductsListScreen = () => {
   const { pageNumber } = useParams();
   const { data, isLoading, error, refetch } = useGetProductsQuery({
      pageNumber,
   });

   const [
      createProduct,
      { isLoading: loadingCreate },
   ] = useCreateProductMutation();

   const [
      deleteProduct,
      { isLoading: deleting, error: trashError },
   ] = useDeleteProductMutation();

   const createProductHandler = async () => {
      if (window.confirm('are you sure you want to create a new product ?')) {
         try {
            await createProduct();
            refetch();
            toast.success('succesfuly created');
         } catch (error) {
            toast.error(error.data.message || error.error);
         }
      }
   };

   const deleteHandler = async (productId) => {
      if (window.confirm('are you sure you want to delete ?')) {
         try {
            const res = await deleteProduct(productId).unwrap();
            refetch();
            toast.success(res.data.Message);
         } catch (error) {
            toast.error(error.data.message || error.error);
         }
      }
   };

   return (
      <>
         <Row className='align-items-center'>
            <Col>
               <h1>Products</h1>
            </Col>
            {deleting && <Loader />}
            <Col className='text-end'>
               <Button className='btn-sm m-3' onClick={createProductHandler}>
                  <FaEdit /> Create Product
               </Button>
               {trashError && <Message variant='danger'>{trashError}</Message>}
            </Col>
         </Row>
         {loadingCreate && <Loader />}
         {isLoading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <>
               <Table striped hover responsive className='table-sm'>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.products.map((product) => (
                        <tr key={product._id}>
                           <td>{product._id}</td>
                           <td>{product.name}</td>
                           <td>{product.price}</td>
                           <td>{product.category}</td>
                           <td>{product.brand}</td>
                           <td>
                              <LinkContainer
                                 to={`/admin/product/${product._id}/edit`}
                              >
                                 <Button
                                    variant='light'
                                    className='btn-sm mx-2'
                                 >
                                    <FaEdit />
                                 </Button>
                              </LinkContainer>
                              {/**DELETE BUTTON */}
                              <Button
                                 variant='danger'
                                 className='btn-sm '
                                 onClick={() => deleteHandler(product._id)}
                              >
                                 <FaTrash style={{ color: 'white' }} />
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
               <Paginate pages={data.pages} page={data.page} isAdmin={true} />
            </>
         )}
      </>
   );
};

export default ProductsListScreen;
