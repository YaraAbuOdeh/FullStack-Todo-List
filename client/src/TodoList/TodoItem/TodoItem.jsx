import {
  MdDeleteForever,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from "react-icons/md";
import styles from "./TodoItem.module.css";


export default function TodoItem({ todo, removeTodo, updateTodo }) {
  const handleDelete = async () => {
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      removeTodo(todo._id);
    } else {
      console.error("Failed to delete todo");
    }
  };

const handleUpdateStatus = async () => {
  const newStatus = !todo.status;
  try {
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    const updatedTodo = { ...todo, status: newStatus };
    updateTodo(updatedTodo);
  } catch (error) {
    console.error("Error updating todo status:", error);
  }
};




  return (
    <div className={styles.todo}>
      <p>{todo.todo}</p>
      <div className="todo-item">
        <div className="todo_status" onClick={handleUpdateStatus}>
          {todo.status ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </div>
        <MdDeleteForever className="todo_delete" onClick={handleDelete} />
      </div>
    </div>
  );
}
