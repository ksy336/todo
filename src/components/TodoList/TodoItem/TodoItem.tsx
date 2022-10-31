import {memo} from "react";
import {Todo} from "../../../../types/Types";
import styles from "./TodoItem.module.css";
import Button from "../../Button/Button";


export interface TodoItemProps {
    todo: Todo,
    checkTodos: (id: Todo["id"]) => void;
    deleteTodo: (id: Todo["id"]) => void;
    selectTodo: (id: Todo["id"]) => void;
}
const TodoItemInner: React.FC<TodoItemProps> = ({todo, checkTodos, deleteTodo, selectTodo}) => {

    return (
        <div className={styles.todo_item_container}>
            <div
                aria-hidden
                style={{
                    opacity: todo.checked ? .5 : 1,
                    textDecoration: todo.checked ? "line-through" : "none"
                }}
                className={styles.todo_item_title}
                onClick={() => checkTodos(todo.id)}
            >
                {todo.name}
            </div>
            <div aria-hidden className={styles.todo_item_description}>{todo.description}</div>
            <div className={styles.todo_item_button_container}>
                <Button color="orange" onClick={() => {selectTodo(todo.id)}}>Edit</Button>
                <Button color="red" onClick={() => deleteTodo(todo.id)}>Delete</Button>
            </div>
        </div>
    );
};

export const TodoItem = memo(TodoItemInner);