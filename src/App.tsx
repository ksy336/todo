import {useCallback, useState} from 'react';
import Header from "./components/Header/Header";
import TaskPanel from "./components/TaskPanel/TaskPanel";
import styles from "./App.module.css";
import {Todo} from "../types/Types";
import TodoList from "./components/TodoList/TodoList";

const TODO_ITEMS = [
    {id: 1, name: "Test", description: "To do test task", checked: false},
    {id: 2, name: "Perfect code", description: "Write clean code", checked: false},
    {id: 3, name: "Tests", description: "Write tests", checked: false},
]

function App() {
    const [todos, setTodos] = useState(TODO_ITEMS);
    const [todoIdForEdit, setTodoIdForEdit] = useState(null);
    const addTodo = useCallback(({name, description}: Omit<Todo, "checked" | "id">) => {
        setTodos([
            ...todos,
        {
            id: todos[todos.length - 1].id + 1,
            description,
            name,
            checked: false
        }
        ])
    }, [todos])
    const checkTodo = useCallback((id: Todo["id"]) => {
        setTodos(
            todos.map((todo: Todo) => {
                console.log(todo);
                if(todo.id === id) {
                    return  {...todo, checked: !todo.checked}
                }
                return todo
            })
        )
    }, [todos])
    const deleteTodo = (id: Todo["id"]) => {
        setTodos(todos.filter((todo: Todo) => {
            return todo.id !== id;
        }))
    }
    const selectTodoId = (id: Todo["id"]) => {
        setTodoIdForEdit(id);
    }
    const changeTodo = ({name, description}: Omit<Todo, "checked" | "id">) => {
        setTodos(
            todos.map((todo: Todo) => {
                console.log(todo);
                if(todo.id === todoIdForEdit) {
                    return  {...todo, name, description}
                }
                return todo
            })
        );
        setTodoIdForEdit(null);
    }

  return (
    <div className={styles.wrapper}>
      <Header todoCount={todos.length} />
      <TaskPanel mode="add" addTodo={addTodo} />
      <TodoList changeTodo={changeTodo} todos={todos} checkTodos={checkTodo} deleteTodo={deleteTodo} selectTodo={selectTodoId} todoIdForEdit={todoIdForEdit} />
    </div>
  );
}

export default App;
