import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, incrementItemQuantity, decrementItemQuantity } from '../Reducer/cartSlice';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <Container className="my-4">
      <h1 className="text-center">Your Cart</h1>
      <Row>
        {cartItems.map(item => (
          <Col md={4} className="mb-4" key={item.id}>
            <Card className="h-100 d-flex flex-column">
              <Card.Img variant="top" src={item.image} alt={item.title} style={{ height: '200px', objectFit: 'contain' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>${item.price}</Card.Text>
                <Card.Text>Quantity: {item.quantity}</Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                  <Button variant="danger" onClick={() => dispatch(removeItemFromCart(item.id))}>
                    Remove
                  </Button>
                  <div className="d-flex align-items-center">
                    <Button variant="secondary" onClick={() => dispatch(decrementItemQuantity(item.id))}>
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="secondary" onClick={() => dispatch(incrementItemQuantity(item.id))}>
                      +
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h2 className="text-center">Total: ${totalAmount.toFixed(2)}</h2>
    </Container>
  );
};

export default Cart;
