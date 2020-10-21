import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_ADMIN_REQUEST,
  PRODUCT_DELETE_ADMIN_SUCCESS,
  PRODUCT_DELETE_ADMIN_FAIL,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  // fetch products
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const response = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: errorMessage,
    });
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  // fetch product
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const response = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_ADMIN_REQUEST });

  // make request
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${productId}`, config);
    dispatch({ type: PRODUCT_DELETE_ADMIN_SUCCESS });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: PRODUCT_DELETE_ADMIN_FAIL,
      payload: errorMessage,
    });
  }
};
