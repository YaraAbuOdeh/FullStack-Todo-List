import "./App.css";
import TodoList from "./TodoList/TodoList";

export default function App() {
  return (
    <main className="container">
      <h1 className="title">Todos</h1>
      <TodoList />
    </main>
  );
}
