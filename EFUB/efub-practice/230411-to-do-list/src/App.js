import TodoList from "./components/TodoList";
import { createGlobalStyle } from "styled-components";
import TodoHead from "./components/TodoHead";
import TodoTemplate from "./components/TodoTemplate";
import TodoCreate from "./components/TodoCreate";
import React, { useEffect, useState } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef
  }
`;

function App() {
  const [todoList, setTodoList] = useState(() => {
    const localTodoList = localStorage.getItem("localTodoList");
    return localTodoList ? JSON.parse(localTodoList) : [];
  });

  useEffect(() => {
    localStorage.setItem("localTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList todoList={todoList} setTodoList={setTodoList}/>
        <TodoCreate todoList={todoList} setTodoList={setTodoList} />
      </TodoTemplate>
    </>
  );
}

export default App;
