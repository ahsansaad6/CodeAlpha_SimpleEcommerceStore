// frontend/src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Assuming you have react-icons installed
import { LinkContainer } from 'react-router-bootstrap'; // For linking react-bootstrap components
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useLogoutMutation } from '../slices/userApiSlice'; // Import logout mutation hook
import { logout } from '../slices/authSlice'; // Import logout action

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth); // Get user info from Redux state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation(); // Initialize logout mutation

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // Call the logout API endpoint
      dispatch(logout()); // Dispatch the Redux logout action to clear state and localStorage
      navigate('/login'); // Redirect to login page after logout
    } catch (err) {
      console.error(err); // Log any errors during logout
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'> {/* ms-auto pushes items to the right */}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? ( // Conditional rendering based on userInfo
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
