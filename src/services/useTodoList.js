import { create } from "zustand";
import { getTodos } from "@/getTodos";
import { createTodo } from "@/createTodo";
import { deleteTodo } from "@/deleteTodo";

export const useTodoList = create((set, get) => ({
  todos: [],
  task: "",

  setTask: (newTask) => {
    set({ task: newTask });
  },

  loadTasks: async () => {
    const todos = await getTodos("user1");
    set({ todos });
  },

  addTask: async () => {
    const todo = await createTodo("user1", get().task);

    set((prev) => ({
      task: "",
      todos: [...prev.todos, todo],
    }));
  },

  deleteTask: async (index) => {
    const todo = get().todos[index];
    await deleteTodo(todo.id);
    set((prev) => ({
      todos: prev.todos.filter((_, i) => index !== i),
    }));
  },
}));
