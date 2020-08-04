import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, applyMiddleware, createStore } from "redux";
import { of, concat } from "rxjs";
import { ajax } from "rxjs/ajax";
import logger from "redux-logger";
import {
  filter,
  delay,
  mergeMap,
  flatMap,
  mapTo,
  catchError
} from "rxjs/operators";
import { ofType, createEpicMiddleware, combineEpics } from "redux-observable";
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

const pingReducer = (state = { isPinging: false, userinfo: "" }, action) => {
  switch (action.type) {
    case "PING":
      return { ...state, isPinging: true };

    case "PONG":
      return { ...state, isPinging: false };

    case "PONGPONG":
      return { ...state, isPinging: true };

    case "FETCH_USER_FULFILLED":
      return { ...state, userinfo: action.userinfo };

    case "FETCH_USER_REJECTED":
      return { ...state, userinfo: action.payload, error: action.error };

    default:
      return state;
  }
};

const isFetchingUser = (state = false, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return true;

    case "FETCH_USER_FULFILLED":
    case "FETCH_USER_CANCELLED":
      return false;

    default:
      return state;
  }
};

/*const store = createStore(
  combineReducers({
    emp: employeeReducer,
    user: userReducer,
    ping: pingReducer
  }),
  applyMiddleware(epicMidd)
);*/

const fetchUserFulfilled = userinfo => {
  return {
    type: "FETCH_USER_FULFILLED",
    userinfo
  };
};

const PING = "PING";
const PONG = "PONG";

const ping = () => ({ type: PING });
const pong = () => ({ type: PONG });

const changeName = () => ({
  type: "setName",
  payload: "Onono Redux Observable",
  age: 99
});

const pingEpic = action$ =>
  action$.pipe(
    filter(action => action.type === "PING"),
    ofType("PING"),
    //delay(1000),
    mergeMap(response =>
      ajax.getJSON(`https://api.github.com/users/onono2`).pipe(
        delay(3000),
        flatMap(response =>
          concat(of(pong()), of(changeName()), of(fetchUserFulfilled(response)))
        ),
        catchError(error =>
          of({
            type: "FETCH_USER_REJECTED",
            payload: error.xhr.response,
            error: true
          })
        )
      )
    )
  );

const pongEpic = action$ =>
  action$.pipe(
    filter(action => action.type === "PONGPONG"),
    ofType("PONGPONG"),
    delay(3000),
    mapTo(ping())
  );

const rootEpic = combineEpics(pingEpic, pongEpic);

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  combineReducers({
    emp: employeeReducer,
    user: userReducer,
    ping: pingReducer
  }),
  applyMiddleware(epicMiddleware, logger)
);

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
