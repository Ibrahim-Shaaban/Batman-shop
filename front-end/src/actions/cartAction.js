import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_ADD_PAYMENT_METHOD,
  CART_ADD_SHIPPING_ADDRESS,
  CART_REMOVE_ITEM,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // fetch product
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.warn(errorMessage);
    // dispatch({
    //   type: PRODUCT_DETAILS_FAIL,
    //   payload: errorMessage,
    // });
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addShippingAddress = (shippingAddressData) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CART_ADD_SHIPPING_ADDRESS,
    payload: shippingAddressData,
  });

  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(getState().cart.shippingAddress)
  );
};

export const addPaymentMethod = (paymentMethodData) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CART_ADD_PAYMENT_METHOD,
    payload: paymentMethodData,
  });

  localStorage.setItem(
    "paymentMethod",
    JSON.stringify(getState().cart.paymentMethod)
  );
};
