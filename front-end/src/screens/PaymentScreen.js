import React, { useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "../componenets/CheckoutSteps ";
import FormContainer from "../componenets/FormContainer";

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cartState.shippingAddress) {
      history.push("/shipping");
    }
  }, [history, cartState.shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentMethod));
    if (cartState.paymentMethod) {
      history.push("/placeorder");
    }
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value={paymentMethod}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
