import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      setTodos(todos);
    }
    getTodos();
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo._id !== todoId));
  };

   const updateTodo = (updatedTodo) => {
     setTodos(
       todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
     );
   };


  return (
    <>
      <TodoForm addTodo={addTodo} />
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          ))}
      </div>
    </>
  );
}
