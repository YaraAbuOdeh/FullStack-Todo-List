import { useState } from "react";
import styles from "./TodoForm.module.css"
export default function TodoForm({ addTodo }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 0) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      addTodo(newTodo);
      setContent("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.formInput}
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a new todo..."
        required
      />
      <button className={styles.formButton} type="submit">
        Create Todo
      </button>
    </form>
  );
}
