import * as actionTypes from "./actionTypes";

const initialState: CartState = {
  cartItemsByProductId: {},
};

const reducer = (
  state: CartState = initialState,
  action: ProductAction
): CartState => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      if (!state.cartItemsByProductId[action.cartItem.id]) {
        const newCartItem: ICartItem = {
          id: action.cartItem.id, // not really unique
          quantity: 1,
          product: action.cartItem,
        };

        return {
          ...state,
          cartItemsByProductId: {
            ...state.cartItemsByProductId,
            [action.cartItem.id]: newCartItem,
          },
        };
      } else {
        return {
          ...state,
          cartItemsByProductId: {
            ...state.cartItemsByProductId,
            [action.cartItem.id]: {
              ...state.cartItemsByProductId[action.cartItem.id],
              quantity:
                state.cartItemsByProductId[action.cartItem.id].quantity + 1,
            },
          },
        };
      }
    case actionTypes.CLEAR_CART:
      return { ...state, cartItemsByProductId: {} };
  }
  return state;
};
export default reducer;
