import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./componenets/Footer";
import Header from "./componenets/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container className="py-3">
          <Route path={"/product/:id"} component={ProductScreen} />
          <Route path={"/cart/:id?"} component={CartScreen} />
          <Route path={"/login"} component={LoginScreen} />
          <Route path={"/register"} component={RegisterScreen} />
          <Route path={"/profile"} component={ProfileScreen} />
          <Route path={"/shipping"} component={ShippingAddressScreen} />
          <Route path={"/payment"} component={PaymentScreen} />
          <Route path={"/placeorder"} component={PlaceOrderScreen} />
          <Route path={"/"} component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
