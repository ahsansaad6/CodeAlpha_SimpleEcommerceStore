// frontend/src/components/Product.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Assuming you have a Rating component, if not, we'll use a simple text display for now
// import Rating from './Rating'; // If you have a separate Rating component

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded h-100 d-flex flex-column'> {/* h-100 for consistent height, d-flex flex-column for content distribution */}
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.imageUrl}
          variant='top'
          style={{ height: '200px', objectFit: 'contain', padding: '10px' }} // Fixed height for consistent image size
        />
      </Link>

      <Card.Body className='d-flex flex-column'> {/* flex-column for body content */}
        {/* Product Name */}
        <Link to={`/product/${product._id}`} className='text-decoration-none'>
          <Card.Title as='div' className='product-title text-truncate'> {/* text-truncate for long names */}
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        {/* Product Rating */}
        <Card.Text as='div' className='my-2'>
          {/* If you have a Rating component, use it here: */}
          {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} /> */}
          {/* Otherwise, use simple text: */}
          {product.rating} stars ({product.numReviews} reviews)
        </Card.Text>

        {/* Product Price */}
        <Card.Text as='h3' className='mt-auto'> {/* mt-auto pushes price to bottom for consistent alignment */}
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
