import "./App.css";
import TodoList from "./TodoList/TodoList/TodoList";
const container = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const title = {
  textAlign: "center",
  fontSize: "3rem",
  padding: "3rem 0 1rem",
};

export default function App() {
  return (
    <main style={container}>
      <h1 style={title}>Todos</h1>
      <TodoList />
    </main>
  );
}
