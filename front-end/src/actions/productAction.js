import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productList";
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
