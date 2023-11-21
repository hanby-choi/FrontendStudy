'use client';
import Link from 'next/link';

export default function ListItem({ result }) {
  const handleDelete = (e, i) => {
    fetch('/api/post/delete', {
      method: 'DELETE',
      body: result[i]._id,
    }).then((r) => {
      console.log(r.json());
      if (r.status == 200) {
        e.target.parentElement.style.opacity = 0;
        setTimeout(() => {
          e.target.parentElement.style.display = 'none';
        }, 1000);
      }
    });
  };

  return (
    <div>
      {result.map((a, i) => {
        return (
          <div className="list-item">
            <Link href={'/detail/' + result[i]._id}>
              <h4>{result[i].title}</h4>
            </Link>
            <Link href={'/edit/' + result[i]._id}>✏</Link>
            <span onClick={(e) => handleDelete(e, i)}>🗑️</span>
            <p>1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
