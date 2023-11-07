'use client';

import { useState } from 'react';

export default function ListPage() {
  const [count, setCount] = useState([0, 0, 0]);
  return (
    <>
      <div>토마토: {count[0]}</div>
      <button
        onClick={() => {
          let copy = [...count];
          copy[0]++;
          setCount(copy);
        }}
      >
        +
      </button>
      <div>복숭아: {count[1]}</div>
      <button
        onClick={() => {
          let copy = [...count];
          copy[1]++;
          setCount(copy);
        }}
      >
        +
      </button>
      <div>포도: {count[2]}</div>
      <button
        onClick={() => {
          let copy = [...count];
          copy[2]++;
          setCount(copy);
        }}
      >
        +
      </button>
    </>
  );
}
