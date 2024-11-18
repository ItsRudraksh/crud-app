import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:5000/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (newTodo) {
      const response = await axios.post("http://localhost:5000/todos", {
        title: newTodo,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    }
  };

  const toggleComplete = async (id, completed) => {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, {
      completed,
    });
    setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
