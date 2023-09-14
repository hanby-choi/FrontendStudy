import styled, { css } from "styled-components";

const TodoItem = ({ text, todoList, setTodoList, id, done }) => {
  const deleteItem = () => {
    setTodoList((todoList) => todoList.filter((item) => item.id !== id));
  };

  const toggleItem = () => {
    setTodoList(
      todoList.map((item) => (item.id === id ? { ...item, done: !done } : item))
    );
  };

  return (
    <>
      <TodoItemBlock>
        <Text isDone={done}>{text}</Text>
        <ToggleButton onClick={toggleItem}>✓</ToggleButton>
        <DeleteButton onClick={deleteItem}>X</DeleteButton>
      </TodoItemBlock>
      <Line />
    </>
  );
};

//스타일 코드는 수정하지 않아도 됩니다.
const TodoItemBlock = styled.div`
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
`;
const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.isDone &&
    css`
      text-decoration: line-through;
    `}
`;
const Line = styled.hr`
  border: solid 1px #e3e3e3;
`;
const DeleteButton = styled.button`
  background: #ff6b6b;
  &:hover {
    background: #ff8787;
  }
  &:active {
    background: #fa5252;
  }
  margin-right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  font-size: 15px;
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
const ToggleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }
  margin-right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  font-size: 18dspx;
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

export default TodoItem;
