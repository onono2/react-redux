import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import App from "./App";

const initialState = {
  result: 15000,
  value: 1,
  textEdit: "",
  indexEdit: ""
};

const userReducer = (state = { name: "oneloya", age: 15 }, action) => {
  switch (action.type) {
    case "setName":
      return (state = {
        ...state,
        name: action.payload,
        age: action.age,
        position: action.position
      });
    case "setAge":
      state = {
        ...state,
        age: action.payload
      };
      break;
    default:
      return state;
  }
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return (state = {
        ...state,
        value: [...state.value, action.payload]
      });
    case "PREEDIT":
      return (state = {
        ...state,
        textEdit: action.message,
        indexEdit: action.payload
      });
    case "EDIT":
      let toEditList = [...state.value];
      let toEdit = toEditList[action.payload];
      toEdit = action.message;
      toEditList[action.payload] = toEdit;

      return (state = {
        ...state,
        value: toEditList
      });
    case "SUBTRACT":
      return (state = {
        ...state,
        value: []
      });
    case "DELETE":
      const toRemove = action.payload;
      const filteredArray = [...state.value.filter((_, i) => i !== toRemove)];
      return (state = {
        ...state,
        value: filteredArray
      });

    default:
      return state;
  }
};

const store = createStore(
  combineReducers({ emp: employeeReducer, user: userReducer }),
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
