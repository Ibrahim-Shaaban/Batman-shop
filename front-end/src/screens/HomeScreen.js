import React, { Fragment, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Product from "../componenets/Product";
// import products from "../products";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await axios.get("/api/products");
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <h2>latest products</h2>
        </Col>
        {products.map((product) => (
          <Col key={product._id} md={6} lg={4} xl={3} xs={12}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
