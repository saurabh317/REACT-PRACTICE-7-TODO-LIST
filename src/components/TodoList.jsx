import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [currentTime, setCurrentTime] = useState([]);
  const [userGivenTime, setUserGivenTime] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    const newCurrentTime = [
      `${new Date().getDate()}- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      ...currentTime,
    ];
    setCurrentTime(newCurrentTime);
    setTodos(newTodos);
    const newuserGivenTime = [todo.time, ...userGivenTime];
    setUserGivenTime(newuserGivenTime);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }


    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );

    const newDeadline = [newValue.time ,...userGivenTime];
    setUserGivenTime(newDeadline);
      

  };

  const removeTodo = (id) => {
    console.log("🚀 ~ file: TodoList.jsx:47 ~ removeTodo ~ id", id)
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        currentDateTime={currentTime}
        userGivenTime={userGivenTime}
      />
    </>
  );
}

export default TodoList;
