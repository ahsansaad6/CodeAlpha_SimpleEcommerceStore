// frontend/src/screens/LoginScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'; // Assuming you have this component
import Loader from '../components/Loader'; // Assuming you have this component
import Message from '../components/Message'; // Assuming you have this component
import { useLoginMutation } from '../slices/userApiSlice'; // Import the login mutation hook
import { setCredentials } from '../slices/authSlice'; // Import the setCredentials action

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading, error }] = useLoginMutation(); // RTK Query login hook

    const { userInfo } = useSelector((state) => state.auth); // Get userInfo from auth state

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'; // Get redirect URL from query params or default to home

    useEffect(() => {
        if (userInfo) {
            navigate(redirect); // If user is already logged in, redirect them
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // Call the login mutation (sends request to backend)
            const res = await login({ email, password }).unwrap();
            // Dispatch setCredentials to update Redux state and localStorage
            dispatch(setCredentials({ ...res }));
            // Navigate to the redirect URL or home
            navigate(redirect);
        } catch (err) {
            console.error(err?.data?.message || err.error); // Log the error
            // The error state from useLoginMutation will handle displaying the message
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>

            {/* Display error message if login fails */}
            {error && <Message variant='danger'>{error?.data?.message || error.error}</Message>}

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button
                    disabled={isLoading}
                    type='submit'
                    variant='primary'
                    className='mt-3'
                >
                    Sign In
                </Button>

                {isLoading && <Loader />} {/* Show loader while loading */}
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;