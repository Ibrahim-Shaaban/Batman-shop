import axios from "axios";

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export const createOrder = (orderData) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  // make request

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const response = await axios.post("/api/orders", orderData, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: errorMessage,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  // make request

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const response = await axios.get(`/api/orders/${orderId}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  // make request

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const response = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

export const resetPayment = () => (dispatch) => {
  dispatch({
    type: ORDER_PAY_RESET,
  });
};
