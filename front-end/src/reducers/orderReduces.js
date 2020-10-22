import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_RESET,
  ORDER_LIST_USER_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (initialState = { order: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        order: payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return initialState;
  }
};

export const orderDetailsReducer = (
  initialState = { order: null, loading: true },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...initialState,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return initialState;
  }
};

export const orderPayReducer = (initialState = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: payload,
        success: false,
      };

    case ORDER_PAY_RESET:
      return {};
    default:
      return initialState;
  }
};

export const orderListUserReducer = (initialState = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_LIST_USER_REQUEST:
      return {
        loading: true,
      };

    case ORDER_LIST_USER_SUCCESS:
      return {
        loading: false,
        orders: payload,
      };

    case ORDER_LIST_USER_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case ORDER_LIST_USER_RESET:
      return {
        orders: [],
      };

    default:
      return initialState;
  }
};

export const orderListAdminReducer = (
  initialState = { orders: [] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_LIST_ADMIN_REQUEST:
      return {
        loading: true,
      };

    case ORDER_LIST_ADMIN_SUCCESS:
      return {
        loading: false,
        orders: payload,
      };

    case ORDER_LIST_ADMIN_FAIL:
      return {
        loading: false,
        error: payload,
      };

    // case ORDER_LIST_ADMIN_RESET:
    //   return {
    //     orders: [],
    //   };

    default:
      return initialState;
  }
};
