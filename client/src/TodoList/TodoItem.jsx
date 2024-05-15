import {
  MdDeleteForever,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from "react-icons/md";

export default function TodoItem({ todo, removeTodo, updateTodo }) {
    
  const handleDelete = async () => {
    await fetch(`/api/todos/${todo._id}`, {
      method: "DELETE",
    });
    removeTodo(todo._id);
    };
     const handleUpdateStatus = async () => {
       // Optimistically update UI
       const updatedTodo = { ...todo, status: !todo.status };
       updateTodo(updatedTodo);

       // Update database
       const res = await fetch(`/api/todos/${todo._id}`, {
         method: "PUT",
         body: JSON.stringify({ status: !todo.status }), // Toggle the status
         headers: {
           "Content-Type": "application/json",
         },
       });

       if (!res.ok) {
         // If there's an error updating the database, revert the UI change
         updateTodo(todo);
       }
     };


  return (
    <div className="todo">
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
