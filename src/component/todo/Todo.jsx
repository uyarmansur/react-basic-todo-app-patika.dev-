import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";

export default function Todo({ addTodo, todos }) {
  const [todo, setTodo] = useState({ todoValue: "", IsActive: true });
  const handleChange = (event) => {
    setTodo({ ...todo, todoValue: event.target.value });
    console.log(todo);
  };
  const handleClick = () => {
    let newResult = [...todos];
    newResult = newResult.map((item) => {
      if (!item.IsActive) {
        item.IsActive = true;
      } else {
        item.IsActive = false;
      }
      return item;
    });
    addTodo([...newResult]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo([...todos, todo]);
    let localSide = [];
    localSide.push(...todos, todo);
    localStorage.setItem("todos", JSON.stringify(localSide));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderBottom: "1px solid black",
        padding: "5px 0 ",
      }}
    >
      <FontAwesomeIcon
        icon={faChevronDown}
        onClick={handleClick}
      ></FontAwesomeIcon>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="What needs to be done?"
          onChange={handleChange}
          style={{
            border: "none",
            outline: "none",
            fontStyle: "italic",
            fontSize: "1em",
            height: "30px",
            padding: "0 10px",
            backgroundColor: "aliceblue",
          }}
        />
        <button
          type="submit"
          style={{
            border: "none",
            padding: "8px 15px",
            backgroundColor: "lightgreen",
            borderRadius: "4px",
            marginLeft: "4px",
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}
