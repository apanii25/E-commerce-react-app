import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product.css'; // Import the custom CSS file

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

  const categoryIcons = {
    electronics: 'fas fa-tv',
    jewelery: 'fas fa-gem',
    "men's clothing": 'fas fa-tshirt',
    "women's clothing": 'fas fa-female',
  };

  return (
    <Container fluid className="bg-light category-bar">
      <Row className="justify-content-center">
        {categories.map(category => (
          <Col xs={6} sm={4} md={3} lg={2} className="text-center mb-3" key={category}>
            <Link to={`/category/${category}`} className="category-link">
              <i className={`${categoryIcons[category]} category-icon`}></i>
              <div className="fw-bold">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryBar;
