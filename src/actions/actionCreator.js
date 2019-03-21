import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  SAVE_TODO,
  EDIT_TODO
} from "./actionsTypes";

export const addTodo = text => ({
  type: ADD_TODO,
  text: text
});

export const deleteTodo = id => ({
  type: REMOVE_TODO,
  id: id
});
export const saveTodo = props => ({
  type: SAVE_TODO,
  id: props.id,
  text: props.text
});

export const toggleTodo = props => {
  return {
    type: TOGGLE_TODO,
    id: props.id,
    text: props.text
  };
};

export const editTodo = props => {
  return {
    type: EDIT_TODO,
    id: props.id,
    text: props.text
  };
};

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
});
