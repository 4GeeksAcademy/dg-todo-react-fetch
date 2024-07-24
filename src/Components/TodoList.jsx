"use client";

import { useEffect, useState } from "react";
import { getTodos } from "@/services/getTodos";

export function TodoList({ user }) {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const loadData = async () => {
    const data = await getTodos(user);
    setTodos(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChangeTask = (ev) => {
    setTask(ev.target.value);
  };

  const handleEnter = (ev) => {
    if (ev.key === "Enter" && task.trim() !== "") {
      const newTodo = { label: task.trim(), is_done: false };
      setTodos([newTodo, ...todos]);
      setTask("");
    }
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="w-2/12 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <input
        className="border"
        value={task}
        onChange={handleChangeTask}
        onKeyDown={handleEnter}
      />

      <ul className="w-full">
        {todos.map((todo, index) => (
          <li key={index} className="flex items-center justify-between">
            <div>{todo.label}</div>

            <button
              onClick={() => handleDelete(index)}
              className="px-1 bg-red-400 hover:bg-red-700 text-white text-xs rounded-lg"
            >
              x
            </button>
          </li>
        ))}
      </ul>

      <div>
        {todos.length > 0 ? (
          <span>{todos.length} items left</span>
        ) : (
          <span>No items left</span>
        )}
      </div>
    </div>
  );
}
