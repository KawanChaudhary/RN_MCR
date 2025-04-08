export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const MARK_DONE = 'MARK_DONE';

export const addTodo = todo => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  payload: id,
});

export const markDone = id => ({
  type: MARK_DONE,
  payload: id,
});

export const editTodo = (id, text) => ({
  type: EDIT_TODO,
  payload: {id, text},
});
