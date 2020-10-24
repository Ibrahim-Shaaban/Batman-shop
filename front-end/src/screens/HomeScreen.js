import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { listProducts, resetFetchProduct } from "../actions/productAction";

import Product from "../componenets/Product";
import Loader from "../componenets/Loader";
import Message from "../componenets/Message";
import Paginate from "../componenets/Paginate";
import ProductCarousel from "../componenets/ProductCarousel ";
import { Link } from "react-router-dom";
const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.productList);

  const { loading, error, products, pages, currentPage } = state;

  const { keyword, pageNumber } = match.params;

  useEffect(() => {
    dispatch(resetFetchProduct());
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h2>latest products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {/* <Col md={12}>
              
            </Col> */}
            {products.map((product) => (
              <Col key={product._id} md={6} lg={4} xl={3} xs={12}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} currentPage={currentPage} keyword={keyword} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
