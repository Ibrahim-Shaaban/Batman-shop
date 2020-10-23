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
  PRODUCT_CREATE_ADMIN_REQUEST,
  PRODUCT_CREATE_ADMIN_SUCCESS,
  PRODUCT_CREATE_ADMIN_FAIL,
  PRODUCT_CREATE_ADMIN_RESET,
  PRODUCT_UPDATE_ADMIN_REQUEST,
  PRODUCT_UPDATE_ADMIN_SUCCESS,
  PRODUCT_UPDATE_ADMIN_FAIL,
  PRODUCT_UPDATE_ADMIN_RESET,
  PRODUCT_DETAILS_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = (keyword = "") => async (dispatch) => {
  // fetch products
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const response = await axios.get(`/api/products?keyword=${keyword}`);
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

export const resetFetchProduct = () => (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_RESET });
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

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_ADMIN_REQUEST });

  // make request
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const response = await axios.post("/api/products", {}, config);
    dispatch({ type: PRODUCT_CREATE_ADMIN_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: PRODUCT_CREATE_ADMIN_FAIL,
      payload: errorMessage,
    });
  }
};

export const resetCreateProduct = () => (dispatch) => {
  dispatch({ type: PRODUCT_CREATE_ADMIN_RESET });
};

export const updateProduct = (updatedProduct, productId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PRODUCT_UPDATE_ADMIN_REQUEST });

  // make request
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const response = await axios.put(
      `/api/products/${productId}`,
      updatedProduct,
      config
    );
    dispatch({ type: PRODUCT_UPDATE_ADMIN_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: PRODUCT_UPDATE_ADMIN_FAIL,
      payload: errorMessage,
    });
  }
};

export const resetUpdateProduct = () => (dispatch) => {
  dispatch({ type: PRODUCT_UPDATE_ADMIN_RESET });
};

export const createProductReview = (review, productId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

  // make request
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: errorMessage,
    });
  }
};

export const resetProductReviewCreate = () => (dispatch) => {
  dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
};
