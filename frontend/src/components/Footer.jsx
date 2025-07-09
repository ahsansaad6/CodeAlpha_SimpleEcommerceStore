// frontend/src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Will install react-bootstrap next

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; ProShop
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;