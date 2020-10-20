import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
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

export const userDetailsReducer = (initialState = { user: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: payload,
        error: null,
      };

    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case USER_DETAILS_RESET:
      return {
        user: null,
      };

    default:
      return initialState;
  }
};

export const userProfileUpdateReducer = (
  initialState = { updatedUserInfo: null, success: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };

    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        updatedUserInfo: payload,
        success: true,
        error: null,
      };

    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: payload,
        success: false,
      };

    default:
      return initialState;
  }
};
