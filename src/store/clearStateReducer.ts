import * as actionTypes from "./actionTypes";

const initialState: CartState = {
  cartItemsByProductId: {},
};

const clearStateReducer = (
  state: CartState = initialState,
  action: { type: string }
): CartState => {
  switch (action.type) {
    case actionTypes.CLEAR_CART:
      return { ...state, cartItemsByProductId: {} };
  }
  return state;
};
export default clearStateReducer;
