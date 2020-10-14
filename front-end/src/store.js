import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReucer";

const initalState = {};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});
const middlewares = [thunk];
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
