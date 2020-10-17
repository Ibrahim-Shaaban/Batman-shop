import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (
  initialState = { cartItems: [], shippingAddress: null },
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
      console.log(initialState.cartItems[0].product);
      console.log(payload);
      return {
        ...initialState,
        cartItems: initialState.cartItems.filter(
          (item) => item.product !== payload
        ),
      };

    default:
      return {
        ...initialState,
      };
  }
};
