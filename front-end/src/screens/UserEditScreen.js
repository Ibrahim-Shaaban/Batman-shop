import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../componenets/Loader";
import Message from "../componenets/Message";
import FormContainer from "../componenets/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUser } from "../actions/userAction";
import { CLEAR_USER_UPDATE_SUCCESS } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const {
    user,
    error,
    loading,
    errorUpdate,
    loadingUpdate,
    successUpdate,
  } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  const matchUserId = match.params.id;
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successUpdate) {
      history.push("/admin/userlist");
      dispatch({ type: CLEAR_USER_UPDATE_SUCCESS });
    } else {
      if (!user && !loading) {
        dispatch(getUserProfile(matchUserId));
      }
      if (user && user._id !== matchUserId) {
        dispatch(getUserProfile(matchUserId));
      }
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    }
  }, [dispatch, history, userInfo, user, loading, matchUserId, successUpdate]);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(updateUser(formData, matchUserId));
  };

  const handleChange = (event) => {
    const elementName = event.target.name;
    if (elementName === "isAdmin") {
      setFormData({
        ...formData,
        [elementName]: event.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [elementName]: event.target.value,
      });
    }
  };
  const { name, email, isAdmin } = formData;
  return (
    <Fragment>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                name="isAdmin"
                label="Is Admin"
                checked={isAdmin}
                onChange={handleChange}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default UserEditScreen;
