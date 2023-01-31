
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  let [data, setData] = useState([]);
  let [limit, setLimit] = useState(10);
  let [page, setPage] = useState(1);
  let offset = (page - 1) * limit;
  const numPages = Math.ceil(data.length / limit);
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/posts")
      .then((res) => { 
        setData(res.data)
       })
      .catch((Error) => { console.log(Error) })
  }, [])

  return (
    <div className="App">
       <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
      {
        data == null ? <div></div> : <main>
        {data.slice(offset, offset + limit).map(({ id, title, body }) => (
          <article key={id}>
            <h3>
              {id}. {title}
            </h3>
            <p>{body}</p>
          </article>
        ))}
      </main>
      }
      <nav>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </nav>
    </div>
  );
}

export default App;
