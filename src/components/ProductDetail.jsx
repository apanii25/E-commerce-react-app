import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, updateItemQuantity } from '../Reducer/cartSlice';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const existingCartItem = cartItems.find(item => item.id === parseInt(id));
  const [quantity, setQuantity] = useState(existingCartItem ? existingCartItem.quantity : 1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(json => setProduct(json));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...product, quantity }));
  };

  const handleIncrementDecrement = (action) => {
    const newQuantity = action === 'increment' ? quantity + 1 : quantity - 1;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      dispatch(updateItemQuantity({ id: parseInt(id), quantity: newQuantity }));
    }
  };

  if (!product) return <div>Loading...</div>;

  const isProductInCart = () => {
    return cartItems.some(item => item.id === parseInt(id));
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Row className="g-0">
              <Col md={6}>
                <Card.Img variant="top" src={product.image} alt={product.title} className="img-fluid p-3" />
              </Col>
              <Col md={6}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-2">{product.title}</Card.Title>
                  <Card.Text className="text-muted">{product.description}</Card.Text>
                  <Card.Text className="fs-4 text-primary">${product.price}</Card.Text>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Button
                      variant="primary"
                      onClick={handleAddToCart}
                      disabled={isProductInCart()}
                    >
                      {isProductInCart() ? 'Added to Cart' : 'Add to Cart'}
                    </Button>
                    <div className="d-flex align-items-center">
                      <Button variant="secondary" onClick={() => handleIncrementDecrement('decrement')}>
                        <i className="fas fa-minus"></i>
                      </Button>
                      <span className="mx-2 fs-5">{quantity}</span>
                      <Button variant="secondary" onClick={() => handleIncrementDecrement('increment')}>
                        <i className="fas fa-plus"></i>
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
