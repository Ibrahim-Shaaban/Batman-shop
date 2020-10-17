import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (initialState = { userInfo: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
        error: null,
      };

    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: payload,
        userInfo: null,
      };

    case USER_LOGOUT:
      return {
        loading: false,
        error: null,
        userInfo: null,
      };

    default:
      return initialState;
  }
};

export const userRegisterReducer = (
  initialState = { userInfo: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
        error: null,
      };

    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: payload,
        userInfo: null,
      };

    default:
      return initialState;
  }
};
