import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../actions/cartAction";
import CheckoutSteps from "../componenets/CheckoutSteps ";
import FormContainer from "../componenets/FormContainer";

const ShippingAddressScreen = ({ history }) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addShippingAddress(formData));
  };

  useEffect(() => {
    if (shippingAddress) {
      const { address, city, postalCode, country } = shippingAddress;

      history.push("payment");

      setFormData({
        address,
        city,
        postalCode,
        country,
      });
    }
  }, [shippingAddress]);

  const { address, city, postalCode, country } = formData;

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            name="postalCode"
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            name="country"
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingAddressScreen;
