import {Todo} from "../../../types/Types";
import {TodoItem} from "./TodoItem/TodoItem";
import TaskPanel from "../TaskPanel/TaskPanel";
import styles from "./TodoList.module.css";

export interface TodoListProps {
    todos: Todo[],
    checkTodos: (id: Todo["id"]) => void;
    deleteTodo: (id: Todo["id"]) => void;
    selectTodo: (id: Todo["id"]) => void;
    todoIdForEdit: Todo["id"];
    changeTodo: ({name, description}: Omit<Todo, "checked" | "id">) => void;
}
const TodoList: React.FC<TodoListProps> = ({todos, checkTodos, deleteTodo, selectTodo, todoIdForEdit, changeTodo}) => {
    return (
        <ul className={styles.todolist_content}>
            {todos.map((todo) => {
                if(todo.id === todoIdForEdit) {
                    return <TaskPanel  changeTodo={changeTodo} mode="edit" key={todo.id} editTodo={{name: todo.name, description: todo.description}} />
                }
               return  <TodoItem key={todo.id} todo={todo} checkTodos={checkTodos} deleteTodo={deleteTodo} selectTodo={selectTodo} />
            })
            }
        </ul>
    );
};

export default TodoList;