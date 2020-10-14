import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

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

export const productDetailsReducer = (
  initialState = { product: { reviews: [] } },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...initialState, loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { ...initialState, loading: false, product: payload };

    case PRODUCT_DETAILS_FAIL:
      return { ...initialState, loading: false, error: payload };

    default:
      return { ...initialState };
  }
};
