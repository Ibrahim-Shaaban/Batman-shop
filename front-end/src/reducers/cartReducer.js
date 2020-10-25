import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_SHIPPING_ADDRESS,
  CART_ADD_PAYMENT_METHOD,
  CLEAR_CART_ITEMS,
} from "../constants/cartConstants";

export const cartReducer = (
  initialState = { cartItems: [], shippingAddress: null, paymentMethod: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      // check if item in cart already
      const foundItem = initialState.cartItems.find(
        (item) => item.product === payload.product
      );
      if (foundItem) {
        return {
          ...initialState,
          cartItems: initialState.cartItems.map((item) => {
            if (item.product === payload.product) return payload;
            return item;
          }),
        };
      } else {
        return {
          ...initialState,
          cartItems: [...initialState.cartItems, payload],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...initialState,
        cartItems: initialState.cartItems.filter(
          (item) => item.product !== payload
        ),
      };

    case CART_ADD_SHIPPING_ADDRESS:
      return {
        ...initialState,
        shippingAddress: payload,
      };

    case CART_ADD_PAYMENT_METHOD:
      return {
        ...initialState,
        paymentMethod: payload,
      };

    case CLEAR_CART_ITEMS:
      return {};

    default:
      return initialState;
  }
};
