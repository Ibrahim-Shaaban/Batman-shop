import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productList";

export const productListReducer = (initialState = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { ...initialState, loading: true };

    case PRODUCT_LIST_SUCCESS:
      return { ...initialState, loading: false, products: payload };

    case PRODUCT_LIST_FAIL:
      return { ...initialState, loading: false, error: payload };

    default:
      return { ...initialState };
  }
};
