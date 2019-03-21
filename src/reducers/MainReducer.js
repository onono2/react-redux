import { combineReducers } from "redux";
import todoss from "./TodoReducer";
import visibilityFilter from "./FilterReducer";

export default combineReducers({
  todoss,
  visibilityFilter
});
