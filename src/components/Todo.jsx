import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";

const Todo = ({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  currentDateTime,
  userGivenTime,
}) => {
  const [selectValue, setSelectvalue] = useState({
    id: null,
    value: "",
  });
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  const onSelectChangeHandler = (event, ID, index) => {
    if (
      Number(currentDateTime[index].split("-")[0]) >=
      Number(userGivenTime[index].split("-")[2]) 
    ) {
      setSelectvalue({
        ...selectValue,
        id: ID,
        value: "Overdue",
      });
      return;
    } else {
      setSelectvalue({
        ...selectValue,
        id: ID,
        value: event.target.value,
      });
    }
  };

  const submitUpdate = (value) => {
    updateTodo(edit.id, value , userGivenTime);
    setEdit({
      id: null,
      value: "",
      time: userGivenTime,
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={
        (selectValue.value === "Done" && selectValue.id === todo.id) ||
        (selectValue.value === "Overdue" && selectValue.id === todo.id) ||
        Number(currentDateTime[index].split("-")[0]) >=
          Number(userGivenTime[index].split("-")[2])
          ? "todo-row complete"
          : "todo-row"
      }
      key={index}
    >
      <div key={todo.id}>
        {todo.text}
        <p>{currentDateTime[index]}</p>
        <p>DeadLine {userGivenTime[index]}</p>
      </div>
      <div className="icons">
        {!(selectValue.value === "Done" && selectValue.id === todo.id) &&
          !(selectValue.value === "Overdue" && selectValue.id === todo.id) &&
          !(
            Number(currentDateTime[index].split("-")[0]) >=
            Number(userGivenTime[index].split("-")[2])
          ) && (
            <div className="select">
              <select
                value={selectValue}
                onChange={(e) => onSelectChangeHandler(e, todo.id, index)}
              >
                <option value="Open">Open</option>
                <option value="Working">Working</option>
                <option value="Done">Done</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          )}
        <AiOutlineDelete
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        {!(selectValue.value === "Done" && selectValue.id === todo.id) &&
          !(selectValue.value === "Overdue" && selectValue.id === todo.id) &&
          !(Number(currentDateTime[index].split("-")[0]) >= Number(userGivenTime[index].split("-")[2])) &&
           (
            <TiEdit
              onClick={() => setEdit({ id: todo.id, value: todo.text })}
              className="edit-icon"
            />
          )}
      </div>
    </div>
  ));
};

export default Todo;
