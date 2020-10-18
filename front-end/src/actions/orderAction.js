import axios from "axios";

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
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
