import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Loader from "../componenets/Loader";
import Message from "../componenets/Message";
import FormContainer from "../componenets/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  resetFetchProduct,
  resetUpdateProduct,
  updateProduct,
} from "../actions/productAction";

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.productUpdate);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    countInStock: "",
    category: "",
    description: "",
  });

  const [uploading, setUploading] = useState(false);

  const matchProductId = match.params.id;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      if (successUpdate) {
        history.push("/admin/productlist");
        dispatch(resetUpdateProduct());
        dispatch(resetFetchProduct());
      } else {
        if (!product && !loading) {
          dispatch(fetchProduct(matchProductId));
        } else if (product && product._id !== matchProductId) {
          dispatch(fetchProduct(matchProductId));
        } else if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            image: product.image,
            brand: product.brand,
            countInStock: product.countInStock,
            category: product.category,
            description: product.description,
          });
        }
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    product,
    loading,
    matchProductId,
    successUpdate,
  ]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(updateProduct(formData, matchProductId));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const fileFormData = new FormData();
    fileFormData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", fileFormData, config);

      setFormData({
        ...formData,
        image: data,
      });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const {
    name,
    price,
    image,
    brand,
    countInStock,
    category,
    description,
  } = formData;
  return (
    <Fragment>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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
                name="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                name="image"
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={handleChange}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                name="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                name="countInStock"
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={handleChange}
              ></Form.Control>
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

export default ProductEditScreen;
