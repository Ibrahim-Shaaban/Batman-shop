import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../componenets/FormContainer";
import Message from "../componenets/Message";
import Loader from "../componenets/Loader";
import { register } from "../actions/userAction";

const RegisterScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [message, setMessage] = useState(null); // passowrd confirmation message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = user;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const { name, confirmedPassword, email, password } = formData;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setMessage("passwords are not matched");
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}

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
          Sign Up
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
