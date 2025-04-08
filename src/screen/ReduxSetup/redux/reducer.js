import { MARK_DONE } from './todoAction';
import {ADD_TODO, REMOVE_TODO, EDIT_TODO} from './todoAction';

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const todoToAdd = {
        id: Date.now(),
        text: action.payload,
        hasDone: false,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
      };
      return {
        ...state,
        todos: [...state.todos, todoToAdd],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              text: action.payload.text,
              modifiedAt: Date.now(),
            };
          }
          return todo;
        }),
      };
      case MARK_DONE:
        return {
          ...state,
          todos: state.todos.map(todo => {
            if (todo.id === action.payload) {
              return {
                ...todo,
                hasDone: true,
                modifiedAt: Date.now(),
              };
            }
            return todo;
          }),
        };
    default:
      return state
  }
};

export default todoReducer;
