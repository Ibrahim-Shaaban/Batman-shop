import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

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
