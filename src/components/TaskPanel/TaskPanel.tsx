import { useState} from 'react';
import styles from "./TaskPanel.module.css";
import Button from "../Button/Button";
import {Todo} from "../../../types/Types";

export interface AddTaskPanelProps {
    mode: "add",
    addTodo: ({name, description}: Omit<Todo, "checked" | "id">) => void
}
export interface EditTaskPanelProps {
    mode: "edit",
    editTodo: Omit<Todo, "id" | "checked">,
    changeTodo: ({name, description}: Omit<Todo, "checked" | "id">) => void
}
export type TaskPanelProps = AddTaskPanelProps | EditTaskPanelProps;

const DEFAULT_DATA = {
    name: "",
    description: ""
}
const TaskPanel: React.FC<TaskPanelProps> = (props) => {
   const isEdit = props.mode === "edit";
    const [todo, setTodo] = useState( isEdit ? props.editTodo : DEFAULT_DATA);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setTodo({
            ...todo,
            [name]: value,

        })
    }
    const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const todoItem = {name: todo.name, description: todo.description};
        if(isEdit) {
            return props.changeTodo(todoItem);
        }
        props.addTodo(todoItem)
        setTodo(DEFAULT_DATA)
    }

    return (
        <div className={styles.todo_panel_container}>
            <form className={styles.fields_container} onSubmit={submitHandler}>
                <div className={styles.field_container}>
                    <label htmlFor="name">
                        <div>Name</div>
                        <input
                            id="name"
                            value={todo.name}
                            name="name"
                            onChange={handleChange}
                            type="text"
                            placeholder="What needs to be done?"/>
                    </label>
                </div>
                <div className={styles.field_container}>
                    <label htmlFor="description">
                        <div>Description</div>
                        <input
                            id="description"
                            value={todo.description}
                            name="description"
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter description to the task"/>
                    </label>
                </div>
                <div className={styles.button_container}>
                    {!isEdit && ( <Button color="blue" type="submit"> ADD </Button>)}
                    {isEdit && ( <Button color="orange" type="submit"> EDIT </Button>)}
                </div>
            </form>
        </div>
    );
};

export default TaskPanel;