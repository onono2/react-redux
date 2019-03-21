import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import MainReducer from "./reducers/MainReducer";
import App2 from "./App";

const store = createStore(MainReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App2 />
    33333
  </Provider>,
  document.getElementById("root3")
);
