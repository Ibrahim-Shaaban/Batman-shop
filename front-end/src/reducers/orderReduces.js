import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
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
