// frontend/src/screens/ProfileScreen.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/userApiSlice'; // Import the update user mutation hook
import { setCredentials } from '../slices/authSlice'; // Import setCredentials

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null); // For password mismatch messages

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth); // Get user info from Redux state

    const [updateProfile, { isLoading, error }] = useUpdateUserMutation(); // RTK Query update user hook

    useEffect(() => {
        // Populate form fields with current user info when component mounts
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null); // Clear previous messages

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                // Call the updateProfile mutation
                const res = await updateProfile({
                    _id: userInfo._id, // Pass user ID
                    name,
                    email,
                    password,
                }).unwrap(); // .unwrap() extracts the data or throws an error

                dispatch(setCredentials({ ...res })); // Update Redux state and localStorage
                setMessage('Profile updated successfully!'); // Success message
            } catch (err) {
                console.error(err?.data?.message || err.error);
                // The error state from useUpdateUserMutation will handle displaying the message
            }
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                {/* Display password mismatch message */}
                {message && <Message variant='danger'>{message}</Message>}
                {/* Display API error message */}
                {error && <Message variant='danger'>{error?.data?.message || error.error}</Message>}

                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

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

                    <Form.Group className='my-2' controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button
                        disabled={isLoading}
                        type='submit'
                        variant='primary'
                        className='mt-3'
                    >
                        Update Profile
                    </Button>

                    {isLoading && <Loader />}
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {/* Orders list will go here later */}
            </Col>
        </Row>
    );
};

export default ProfileScreen;