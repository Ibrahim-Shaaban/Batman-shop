import {
  PRODUCT_CREATE_ADMIN_FAIL,
  PRODUCT_CREATE_ADMIN_REQUEST,
  PRODUCT_CREATE_ADMIN_RESET,
  PRODUCT_CREATE_ADMIN_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DELETE_ADMIN_FAIL,
  PRODUCT_DELETE_ADMIN_REQUEST,
  PRODUCT_DELETE_ADMIN_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_ADMIN_FAIL,
  PRODUCT_UPDATE_ADMIN_REQUEST,
  PRODUCT_UPDATE_ADMIN_RESET,
  PRODUCT_UPDATE_ADMIN_SUCCESS,
} from "../constants/productConstants";

export const productListReducer = (
  initialState = { products: [], error: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { ...initialState, loading: true };

    case PRODUCT_LIST_SUCCESS:
      return {
        // ...initialState,
        loading: false,
        products: payload.products,
        currentPage: payload.currentPage,
        pages: payload.pages,
      };

    case PRODUCT_LIST_FAIL:
      return {
        // ...initialState,
        loading: false,
        error: payload,
      };

    default:
      return { ...initialState };
  }
};

export const productDetailsReducer = (
  initialState = { product: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: payload };

    case PRODUCT_DETAILS_RESET:
      return {};

    default:
      return { ...initialState };
  }
};

export const productDeleteReducer = (
  initialState = { product: { reviews: [] } },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DELETE_ADMIN_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_ADMIN_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_ADMIN_FAIL:
      return { loading: false, error: payload };

    default:
      return { ...initialState };
  }
};

export const productCreateReducer = (
  initialState = { product: { reviews: [] } },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_ADMIN_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_ADMIN_SUCCESS:
      return { loading: false, success: true, product: payload };

    case PRODUCT_CREATE_ADMIN_FAIL:
      return { loading: false, error: payload };

    case PRODUCT_CREATE_ADMIN_RESET:
      return {};

    default:
      return { ...initialState };
  }
};

export const productUpdateReducer = (
  initialState = { product: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_UPDATE_ADMIN_REQUEST:
      return { loading: true };

    case PRODUCT_UPDATE_ADMIN_SUCCESS:
      return { loading: false, success: true, product: payload };

    case PRODUCT_UPDATE_ADMIN_FAIL:
      return { loading: false, error: payload };

    case PRODUCT_UPDATE_ADMIN_RESET:
      return {};

    default:
      return { ...initialState };
  }
};

export const productCreateReviewReducer = (initialState = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: payload };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return initialState;
  }
};
