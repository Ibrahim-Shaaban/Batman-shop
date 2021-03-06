import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListAdminReducer,
  orderListUserReducer,
  orderPayReducer,
} from "./reducers/orderReducer";
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  topRatedProductsReducer,
} from "./reducers/productReucer";
import {
  userDetailsReducer,
  userListAdminReducer,
  userLoginReducer,
  userProfileUpdateReducer,
  userRegisterReducer,
} from "./reducers/userReducer";

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const paymentMeyhodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initalState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMeyhodFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  topRatedProducts: topRatedProductsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListUser: orderListUserReducer,
  userListAdmin: userListAdminReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  orderListAdmin: orderListAdminReducer,
  orderDeliver: orderDeliverReducer,
  productCreateReview: productCreateReviewReducer,
});
const middlewares = [thunk];
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
