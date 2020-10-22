import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { listProducts } from "../actions/productAction";

import Product from "../componenets/Product";
import Loader from "../componenets/Loader";
import Message from "../componenets/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.productList);

  const { loading, error, products } = state;

  useEffect(() => {
    // dispatch(resetFetchProduct());
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
      )}
    </Fragment>
  );
};

export default HomeScreen;
