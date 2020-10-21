import {
  CLEAR_USER_UPDATE_SUCCESS,
  USER_DELETE_ADMIN_FAIL,
  USER_DELETE_ADMIN_REQUEST,
  USER_DELETE_ADMIN_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_ADMIN_FAIL,
  USER_LIST_ADMIN_REQUEST,
  USER_LIST_ADMIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_RESET,
  USER_UPDATE_ADMIN_SUCCESS,
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

export const userDetailsReducer = (
  initialState = { user: null, successUpdate: false },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
        successUpdate: false,
      };

    case USER_UPDATE_ADMIN_REQUEST:
      return {
        loadingUpdate: true,
        user: initialState.user,
      };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: payload,
        error: null,
      };

    case USER_UPDATE_ADMIN_SUCCESS:
      return {
        loadingUpdate: false,
        user: payload,
        errorUpdate: null,
        successUpdate: true,
      };

    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case USER_UPDATE_ADMIN_FAIL:
      return {
        loadingUpdate: false,
        errorUpdate: payload,
      };

    case USER_DETAILS_RESET:
    case USER_UPDATE_ADMIN_RESET:
      return {
        user: null,
      };

    case CLEAR_USER_UPDATE_SUCCESS:
      return {
        successUpdate: false,
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

export const userListAdminReducer = (initialState = { users: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LIST_ADMIN_REQUEST:
    case USER_DELETE_ADMIN_REQUEST:
      return {
        ...initialState,
        loading: true,
      };

    case USER_LIST_ADMIN_SUCCESS:
      return {
        loading: false,
        users: payload,
      };

    case USER_LIST_ADMIN_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case USER_DELETE_ADMIN_SUCCESS:
      return {
        loading: false,
        deleteError: null,
        users: initialState.users.filter((user) => user._id !== payload),
      };

    case USER_DELETE_ADMIN_FAIL:
      return {
        loading: false,
        deleteError: payload,
      };

    default:
      return initialState;
  }
};
