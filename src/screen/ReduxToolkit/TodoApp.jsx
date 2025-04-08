import React from 'react';
import { Provider } from 'react-redux';
import store from './reduxToolkit/store';
import TodoList from './TodoList';

const TodoApp = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

export default TodoApp;