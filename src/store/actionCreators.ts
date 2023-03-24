import * as actionTypes from "./actionTypes";

export function addProductToCart(cartItem: IProduct) {
  const action: ProductAction = {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    cartItem,
  };

  return simulateHttpRequest(action);
}

export function clearCart() {
  return { type: actionTypes.CLEAR_CART };
}
export function simulateHttpRequest(action: ProductAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}
