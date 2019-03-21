import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  SAVE_TODO,
  EDIT_TODO
} from "../actions/actionsTypes";
// if you want to show initial data :)
const INITIAL_DATA = [
  {
    id: 0,
    text: "Walk the Dog"
  },
  {
    id: 1,
    text: "learn Redux"
  },
  {
    id: 2,
    text: "Take it Redux"
  },
  {
    id: 3,
    text: "2AF 16 it Redux"
  }
];

//const INITIAL_DATA = [];

const TodoReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.length++,
          text: action.text,
          completed: false
        }
      ];

    case SAVE_TODO:
      // const editIndex = parseInt(action.id, 10);
      //return state.filter(todo => todo.id !== editIndex);
      return state.map(savetodo =>
        savetodo.id === action.id
          ? { ...savetodo, text: savetodo.text }
          : savetodo
      );
    case EDIT_TODO:
      console.log(action);
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );

    case TOGGLE_TODO:
      // const editIndex = parseInt(action.id, 10);
      //return state.filter(todo => todo.id !== editIndex);
      return state;

    case REMOVE_TODO:
      const numIndex = parseInt(action.id, 10);
      //console.log(state.filter(todo => todo.id !== numIndex));
      return state.filter(todo => todo.id !== numIndex);
    default:
      return state;
  }
};

export default TodoReducer;
