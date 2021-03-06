import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import Message from "../componenets/Message";
import Loader from "../componenets/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile } from "../actions/userAction";
import { getUserOrders } from "../actions/orderAction";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = ({ history }) => {
  const [message, setMessage] = useState(null); // passowrd confirmation message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { user, loading, error } = useSelector((state) => state.userDetails);

  const userProfileUpdateState = useSelector(
    (state) => state.userProfileUpdate
  );

  const orderListUser = useSelector((state) => state.orderListUser);
  const {
    orders,
    loading: loadingOrderList,
    error: errorOrderList,
  } = orderListUser;
  useEffect(() => {
    // check if user is logged in
    if (!userInfo) {
      // if no push him to login page
      history.push("/");
    } else {
      if (!user && !loading) {
        // check if request to get profile is done
        dispatch(getUserProfile("profile"));
        dispatch(getUserOrders());
      } else if (user) {
        setFormData({
          ...formData,
          name: user.name,
          email: user.email,
        });
      }
    }

    // if yes get user profile
    // eslint-disable-next-line
  }, [dispatch, history, userInfo, user, loading]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const { confirmedPassword, name, password, email } = formData;

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmedPassword) {
      setMessage("passwords are not matched");
    } else {
      dispatch(updateUserProfile({ name, email, password }));
      if (userProfileUpdateState.success) {
        setFormData({
          ...formData,
          name: userProfileUpdateState.updatedUserInfo.name,
          email: userProfileUpdateState.updatedUserInfo.email,
        });
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>Sign In</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {userProfileUpdateState.error && (
          <Message variant="danger">{userProfileUpdateState.error}</Message>
        )}
        {userProfileUpdateState.success && (
          <Message variant="success">profile is updated</Message>
        )}
        {userProfileUpdateState.loading && <Loader />}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confiremedPassword">
            <Form.Label>Confirmed Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmedPassword"
              placeholder="Enter confirmed password"
              value={confirmedPassword}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            update profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrderList ? (
          <Loader />
        ) : errorOrderList ? (
          <Message variant="danger">{errorOrderList}</Message>
        ) : (
          <Table striped bordered responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
