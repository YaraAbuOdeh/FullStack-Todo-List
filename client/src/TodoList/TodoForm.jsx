import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
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
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form_input"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a new todo..."
        required
      />
      <button type="submit">Create Todo</button>
    </form>
  );
}
