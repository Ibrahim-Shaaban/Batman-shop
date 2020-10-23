import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../componenets/Rating";
import {
  createProductReview,
  fetchProduct,
  resetFetchProduct,
  resetProductReviewCreate,
} from "../actions/productAction";
import Loader from "../componenets/Loader";
import Message from "../componenets/Message";

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.productDetails);
  const { product, loading, error } = state;

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
  } = useSelector((state) => state.productCreateReview);

  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const matchProductId = match.params.id;
  useEffect(() => {
    if (successReview) {
      setFormData({
        rating: 0,
        comment: "",
      });
      dispatch(resetProductReviewCreate());
      dispatch(resetFetchProduct());
    }
    if (!product && !loading && !error) {
      dispatch(fetchProduct(matchProductId));
      dispatch(resetProductReviewCreate());
    }
  }, [dispatch, matchProductId, product, loading, error, successReview]);

  const chooseQuantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const addToCartHandler = () => {
    history.push(`/cart/${matchProductId}?qty=${quantity}`);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(createProductReview(formData, matchProductId));
  };

  const { rating, comment } = formData;
  return (
    <Fragment>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : product ? (
        <Fragment>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            onChange={chooseQuantityHandler}
                            value={quantity}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (number) => (
                                <option key={number} value={number + 1}>
                                  {number + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type={"button"}
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews && product.reviews.length === 0 && (
                <Message>No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {loadingReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          name="rating"
                          value={rating}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select...
                          </option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="comment"
                          row="3"
                          value={comment}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default ProductScreen;
