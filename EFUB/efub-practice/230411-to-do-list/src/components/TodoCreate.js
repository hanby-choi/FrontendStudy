import styled from "styled-components";
import { useState } from "react";

const TodoCreate = ({todoList, setTodoList}) => {
  const [text, setText] = useState("");
  const [id, setId] = useState(Date.now());
  const newItem = {id: id, text: text, done: false};

  const addItem = (e) => {
    e.preventDefault();
    if (text){
      setId(Date.now());
      setTodoList([...todoList, newItem]);
    }
    setText("");
  }

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <TodoForm onSubmit={addItem}>
      <InputBox 
        value={text}
        placeholder="할 일을 입력하세요."
        onChange={handleChange}
      />
      <AddButton>+</AddButton>
    </TodoForm>
  );
};

//스타일 코드는 수정하지 않아도 됩니다.
const AddButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }
  margin-left: 15px;
  cursor: pointer;
  width: 50px;
  height: 50px;

  font-size: 40px;

  bottom: 0px;

  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
`;

const TodoForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;

  display: flex;
  align-items: center;
`;

const InputBox = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 80%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

export default TodoCreate;
