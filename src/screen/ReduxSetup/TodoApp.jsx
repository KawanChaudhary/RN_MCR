import { Provider } from "react-redux"
import store from "./redux/store"
import Todo from "./Todo"

const TodoApp = () => {
  return (
    <Provider store={store}>
        <Todo />
    </Provider>
  )
}

export default TodoApp