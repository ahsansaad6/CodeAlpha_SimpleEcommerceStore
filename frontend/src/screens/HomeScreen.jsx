// frontend/src/screens/HomeScreen.jsx
import React from 'react'; // No need for useState, useEffect with RTK Query
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import { useGetProductsQuery } from '../slices/productApiSlice.js'; // IMPORTANT: Ensure this import is correct

const HomeScreen = () => {
  // Fetch products using RTK Query hook
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? ( // Show loader while data is being fetched
        <Loader />
      ) : error ? ( // Show error message if fetching fails
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : ( // Render products once data is successfully loaded
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}> {/* Responsive column sizing */}
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
