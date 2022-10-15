import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function AllTodos({ todos, addTodo }) {
  const [filteredArray, setFilteredArray] = useState([]);

  //showing the datas on UI
  useEffect(() => {
    if (todos) {
      setFilteredArray(todos);
    }
  }, [todos]);
  //toggling items IsActive status

  const handleClick = (todoValue) => {
    let newResult = todos;
    newResult = todos?.map((item) => {
      if (todoValue === item.todoValue) {
        item.IsActive = !item.IsActive;
        localStorage.setItem("todos", JSON.stringify(newResult));
      }
      return item;
    });
    addTodo([...newResult]);
  };

  //deleting an item from the array

  const handleDelete = (value) => {
    let newArr = [...todos];
    let removedItem = value.index;
    let index = todos.indexOf(removedItem);
    if (index !== 1) {
      newArr.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(newArr));

      addTodo(newArr);
    }
  };

  // filtering undone todos

  const onHoldTodos = () => {
    let newArr = todos.filter((item) => item.IsActive === true);
    setFilteredArray(newArr);
  };

  //filtering done todos

  const doneTodos = () => {
    let newArr = todos.filter((item) => item.IsActive === false);
    setFilteredArray(newArr);
  };

  //delete all todos

  const deleteAll = () => {
    addTodo([]);
    localStorage.setItem("todos", JSON.stringify([]));
  };

  return (
    <div>
      {filteredArray ? (
        filteredArray.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid grey",
            }}
          >
            <FontAwesomeIcon
              onClick={() => handleClick(item.todoValue)}
              icon={faCheck}
              style={{
                border: "1px solid black",
                borderRadius: "50%",
                opacity: item.IsActive ? "0.4" : "1",
                transition: "opacity 1s ease-in-out",
                color: "green",
                padding: "4px",
              }}
            ></FontAwesomeIcon>
            <p
              style={{
                opacity: item.IsActive ? "1" : "0.4",
                textDecoration: item.IsActive ? "" : "line-through",
                transition: "opacity 1s ease-in-out",
              }}
            >
              {item?.todoValue}
            </p>
            <button onClick={() => handleDelete(item)}>x</button>
          </div>
        ))
      ) : (
        <div>no value</div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "13px",
          visibility: todos.length > 0 ? "visible" : "hidden",
        }}
      >
        <p>{todos.length} items exist.</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p
            onClick={() => setFilteredArray(todos)}
            style={{
              border: "1px solid black",
              borderRadius: "3px",
              padding: "4px",
              cursor: "pointer",
            }}
          >
            All
          </p>
          <p
            onClick={onHoldTodos}
            style={{
              margin: "0 4px",
              border: "1px solid black",
              borderRadius: "3px",
              padding: "4px",
              cursor: "pointer",
            }}
          >
            On Hold
          </p>
          <p
            onClick={doneTodos}
            style={{
              border: "1px solid black",
              borderRadius: "3px",
              padding: "4px",
              cursor: "pointer",
            }}
          >
            Done
          </p>
        </div>
        <p
          onClick={deleteAll}
          style={{
            border: "1px solid black",
            borderRadius: "3px",
            padding: "4px",
            cursor: "pointer",
            visibility: filteredArray.length > 0 ? "visible" : "hidden",
          }}
        >
          Clear All
        </p>
      </div>
    </div>
  );
}
