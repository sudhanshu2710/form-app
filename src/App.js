import React, { useState, useEffect } from "react";
import ProductInput from "./component/ProductInput";
import { ProductListItem } from "./component/ProductListItem";
import style from "./App.module.css";

const DUMMY_Array = [];
function App() {
  const [todos, setTodos] = useState([]);
  const [random, setRandom] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  function display() {
    console.log(page);
    fetch(`http://localhost:8000/posts?_page=${page}&_limit=${limit}`, {
      method: "GET",
      headers: { "content-type": "application/json;charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos([...data]);
        setRandom([...data]);
      })
      .catch((err) => console.log(err));
  }
  //display();
  useEffect(() => {
    display();
  }, [page, limit]);
  const removeTask = (id_) => {
    console.log(id_);
    fetch(`http://localhost:8000/posts/${id_}`, {
      method: "DELETE",
      headers: { "content-type": "application/json;charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        display();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (data_) => {
    fetch(`http://localhost:8000/posts`, {
      method: "POST",
      body: JSON.stringify(data_),
      headers: { "content-type": "application/json;charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("done");
        display();
      })
      .catch((err) => console.log(err));
  };
  const increase = () => {
    todos.sort((x, y) => x.cost - y.cost);
    setTodos([...todos]);
  };
  const decrease = () => {
    todos.sort((x, y) => y.cost - x.cost);
    setTodos([...todos]);
  };
  const fruit = () => {
    console.log(random);
    const updated = [];
    random.forEach((e) => {
      if (e.category === "fruits") updated.push(e);
    });

    setTodos([...updated]);
  };
  const veg = () => {
    console.log(random);
    const updated = [];
    random.forEach((e) => {
      if (e.category === "vegetables") updated.push(e);
    });
    setTodos([...updated]);
  };
  const provi = () => {
    console.log(random);
    const updated = [];
    random.forEach((e) => {
      if (e.category === "provisions") updated.push(e);
    });
    setTodos([...updated]);
  };
  const all = () => {
    setPage(1);
    setLimit((prev) => {
      return prev == 100 ? 4 : 100;
    });
  };
  const allInThisPage = () => {
    display();
  };
  const pageincrease = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };
  const pagedecrease = () => {
    setPage((prev) => {
      if (prev == 0) return 0;
      return prev - 1;
    });
  };

  return (
    <div className={style.container}>
      <ProductInput handleSubmit={handleSubmit} />
      <div className={style.container2}>
        <div>Title</div>
        <div>Cost</div>
        <div>Image</div>
        <div>Category</div>
      </div>

      <ul className={style.expensesList}>
        {todos.map((task) => (
          <li key={task.id}>
            <ProductListItem
              title={task.title}
              id={task.id}
              cost={task.cost}
              category={task.category}
              image={task.image}
              removeTask={removeTask}
            />
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            setPage(1);
          }}
        >
          first page
        </button>
        <button onClick={pagedecrease}>previous</button>
        <button onClick={allInThisPage}>current page</button>
        <button onClick={pageincrease}>next</button>
      </div>
      <button onClick={increase}>cost increasing</button>
      <button onClick={decrease}>cost decreasing</button>
      <button onClick={fruit}>fruit</button>
      <button onClick={veg}>vegetable</button>
      <button onClick={provi}>provisions</button>
      <button onClick={all}>pagination/without pagination</button>
    </div>
  );
}

export default App;
