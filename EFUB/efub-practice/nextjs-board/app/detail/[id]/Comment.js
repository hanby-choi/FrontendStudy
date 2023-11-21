'use client';
import { useState, useEffect } from 'react';
export default function Comment({ _id }) {
  const [comment, setComment] = useState('');
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/comment/list?id=' + _id)
      .then((r) => r.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  return (
    <div>
      <div>
        {data.length > 0 ? (
          data.map((a, i) => <p key={i}>{a.content}</p>)
        ) : (
          <p>댓글없음</p>
        )}
      </div>
      <div>댓글</div>
      <input
        placeholder="댓글을 작성해주세요"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="button-style"
        onClick={() => {
          fetch('/api/comment/new', {
            method: 'POST',
            body: JSON.stringify({ comment: comment, _id: _id }),
          });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
