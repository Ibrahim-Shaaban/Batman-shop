import {
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
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";
import { ORDER_LIST_USER_RESET } from "../constants/orderConstants";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  // make request
  try {
    const data = JSON.stringify({ email, password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/api/users/login", data, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorMessage,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });

  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_USER_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  // make request
  try {
    const data = JSON.stringify({ name, email, password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/api/users/register", data, config);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: errorMessage,
    });
  }
};

export const getUserProfile = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });

  // make request
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const response = await axios.get(`/api/users/${id}`, config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

export const updateUserProfile = (updatedUser) => async (
  dispatch,
  getState
) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

  // make request
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const response = await axios.put(
      "/api/users/profile",
      JSON.stringify(updatedUser),
      config
    );
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: response.data,
    });

    // dispatch user update profile reset
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: errorMessage,
    });
  }
};

export const getUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_ADMIN_REQUEST });

  // make request
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const response = await axios.get("/api/users/", config);
    dispatch({
      type: USER_LIST_ADMIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_LIST_ADMIN_FAIL,
      payload: errorMessage,
    });
  }
};

export const deleteUser = (userID) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_ADMIN_REQUEST });

  // make request
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${userID}`, config);
    dispatch({ type: USER_DELETE_ADMIN_SUCCESS, payload: userID });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.log(errorMessage);
    dispatch({
      type: USER_DELETE_ADMIN_FAIL,
      payload: errorMessage,
    });
  }
};
