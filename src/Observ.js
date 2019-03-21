const { createEpicMiddleware } = require("redux-observable");
const { filter, mergeMap } = require("rxjs/operators");
const redux = require("redux");

const startTime = Date.now();

const countEpic = action$ =>
  action$.pipe(
    filter(action => action.type === "CLICK_INCREMENT"),
    // `mergeMap()` supports functions that return promises, as well as observables
    mergeMap(async action => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { type: "INCREMENT", amount: 1 };
    })
  );

const observableMiddleware = createEpicMiddleware();
const store = redux.createStore(
  reducer,
  redux.applyMiddleware(observableMiddleware)
);

observableMiddleware.run(countEpic);

// Sample Redux reducer
function reducer(state = 0, action) {
  console.log(`+${Date.now() - startTime}ms`, action);

  switch (action.type) {
    case "INCREMENT":
      return state + action.amount;
    default:
      return state;
  }
}

store.dispatch({ type: "CLICK_INCREMENT" });
