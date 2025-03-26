// src/components/CategoryDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, updateItemQuantity } from '../Reducer/cartSlice';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryDetails = () => {
  const { category } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => res.json())
      .then(json => setCategoryDetails(json));
  }, [category]);

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find(item => item.id === product.id);
    const quantity = existingCartItem ? existingCartItem.quantity + 1 : 1;
    dispatch(addItemToCart({ ...product, quantity }));
  };

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  if (!categoryDetails) return  <h1 className="loading-message">Loading...</h1>;

  return (
    <Container fluid>
      <h1 className="my-4 text-center">{category}</h1>
      <Row>
        {categoryDetails.map(product => (
          <Col md={4} className="mb-4" key={product.id}>
            <Link to={`/product/${product.id}`} className="text-decoration-none">
              <Card className="h-100 d-flex flex-column product-card">
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <div className="mt-auto d-flex justify-content-between">
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      disabled={isProductInCart(product.id)}
                    >
                      {isProductInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                    </Button>
                    <Button variant="light">
                      <FaHeart />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryDetails;
