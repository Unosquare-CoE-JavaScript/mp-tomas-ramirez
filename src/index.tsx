import * as React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import reducer from "./store/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
const store: Store<CartState, ProductAction> & {
  dispatch: DispatchType;
} = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
