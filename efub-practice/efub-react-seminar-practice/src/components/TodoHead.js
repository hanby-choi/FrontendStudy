//이 파일은 수정하지 않아도 됩니다.
import React from "react";
import styled from "styled-components";

function TodoHead() {
  const today = new Date();

  const dateString = today.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayName = today.toLocaleString("ko-KR", { weekday: "long" });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
    </TodoHeadBlock>
  );
}

//스타일 코드는 수정하지 않아도 됩니다.
const TodoHeadBlock = styled.div`
  h1 {
    margin: 0;
    font-size: 36px;
    color: #20c997;
  }
  .day {
    margin-top: 4px;
    color: #343a40;
    font-size: 21px;
  }
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;
export default TodoHead;
