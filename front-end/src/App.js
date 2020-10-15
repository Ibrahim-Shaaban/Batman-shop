import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./componenets/Footer";
import Header from "./componenets/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container className="py-3">
          <Route path={"/"} component={HomeScreen} exact />
          <Route path={"/product/:id"} component={ProductScreen} />
          <Route path={"/cart/:id?"} component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
