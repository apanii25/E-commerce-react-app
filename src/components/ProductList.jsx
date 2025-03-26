import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../Reducer/cartSlice';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find(item => item.id === product.id);
    const quantity = existingCartItem ? existingCartItem.quantity + 1 : 1;
    dispatch(addItemToCart({ ...product, quantity }));
  };

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prevWishlist =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter(id => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  const isProductInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  return (
    <Container fluid>
      <h1 className="my-4 text-center">Products</h1>
      <Row>
        {products.map(product => (
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
                    <Button
                      variant="light"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                    >
                      {isProductInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
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

export default ProductList;
