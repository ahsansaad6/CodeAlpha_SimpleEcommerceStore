// frontend/src/screens/CartScreen.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; // Import trash icon
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice.js'; // Ensure .js and import removeFromCart

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const { userInfo } = useSelector((state) => state.auth); // Get userInfo to check login status

    // Handler for quantity change (dispatches addToCart to update quantity)
    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    // Handler for removing an item
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id)); // Dispatch the removeFromCart action
    };

    const checkoutHandler = () => {
        // If user is logged in, proceed to shipping. Otherwise, redirect to login with a redirect query.
        if (userInfo) {
            navigate('/shipping'); // Redirect to shipping page
        } else {
            navigate('/login?redirect=/shipping'); // Redirect to login, then shipping after login
        }
    };

    return (
        <Row>
            <Col md={8}>
                <h1 className='my-3'>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row className='align-items-center'>
                                    <Col md={2}>
                                        <Image src={item.imageUrl} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) =>
                                                addToCartHandler(item, Number(e.target.value))
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
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item._id)}
                                        >
                                            <FaTrash /> {/* Use the Font Awesome trash icon */}
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
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                            ${cartItems
                                .reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
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

export default CartScreen;