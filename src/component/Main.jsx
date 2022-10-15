import React, { useState } from "react";
import AllTodos from "./allTodos/AllTodos";
import Todo from "./todo/Todo";
import "./main.css";
export default function Main() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));

  return (
    <div className="main">
      <Todo todos={todos} addTodo={setTodos}></Todo>
      <AllTodos todos={todos} addTodo={setTodos}></AllTodos>
    </div>
  );
}
