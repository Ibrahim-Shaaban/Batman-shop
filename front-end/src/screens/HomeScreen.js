import React, { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../componenets/Product";
import products from "../products";

const HomeScreen = () => {
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
