// src/components/ProductNavbar.js
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product.css';

<Navbar.Brand as={Link} to="/" className="fs-1 text-hover-blue">ShopKart</Navbar.Brand>

const ProductNavbar = () => {
  const cartItemsCount = useSelector(state => state.cart.items.length);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-4 fixed-top">
      <Container fluid>
      <Navbar.Brand as={Link} to="/" className="fs-1 text-hover-blue">ShopKart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto w-50">
            <FormControl type="search" placeholder="Search for products,cloths and more" className="me-2" aria-label="Search" />
            <Button variant="success">Search</Button>
          </Form>
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/profile" className="fs-3 ms-3">
              <i className="fas fa-user"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/wishlist" className="fs-3 ms-3 position-relative">
              <i className="fas fa-heart"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="fs-3 ms-3 position-relative">
  <i className="fas fa-shopping-cart"></i>
  {cartItemsCount > 0 && (
    <Badge
      pill
      bg="danger"
      className="position-absolute top-0 start-0 translate-middle"
      style={{ fontSize: '0.75rem', padding: '0.5em 0.75em' }}
    >
      {cartItemsCount}
    </Badge>
  )}
  <span className="ms-2">Cart</span>
</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ProductNavbar;
