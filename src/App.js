import React, { useState, useEffect } from "react";
import Input from "./component/Input";
import { TaskList } from "./component/TaskList";
import style from "./App.module.css";

const DUMMY_Array = [];
function App() {
  const [todos, setTodos] = useState([]);
  const [random, setRandom] = useState([]);
  function display() {
    fetch(`http://localhost:8000/posts`, {
      method: "GET",
      headers: { "content-type": "application/json;charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...data]);
        setRandom([...data]);
      })
      .catch((err) => console.log(err));
  }
  //display();
  useEffect(() => {
    display();
  }, []);
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
  const update = () => {
    display();
  };
  const increase = () => {
    todos.sort((x, y) => x.salary - y.salary);
    setTodos([...todos]);
  };
  const decrease = () => {
    todos.sort((x, y) => y.salary - x.salary);
    setTodos([...todos]);
  };
  const dept1 = () => {
    console.log(random);
    const updated = [];
    random.forEach((e) => {
      if (e.department === "department 1") updated.push(e);
    });

    setTodos([...updated]);
  };
  const dept2 = () => {
    console.log(random);
    const updated = [];
    random.forEach((e) => {
      if (e.department === "department 2") updated.push(e);
    });
    setTodos([...updated]);
  };
  const dept3 = () => {
    console.log(random);
    const updated = [];
    random.forEach((e) => {
      if (e.department === "department 3") updated.push(e);
    });
    setTodos([...updated]);
  };
  const all = () => {
    display();
  };
  return (
    <div className={style.container}>
      <Input update={update} />
      <div className={style.container2}>
        <div>Name</div>
        <div>Salary</div>
        <div>Department</div>
        <div>Married</div>
      </div>

      <ul className={style.expensesList}>
        {todos.map((task) => (
          <li key={task.id}>
            <TaskList
              fName={task.fName}
              Id={task.id}
              salary={task.salary}
              department={task.department}
              isMarried={task.isMarried}
              age={task.age}
              removeTask={removeTask}
            />
          </li>
        ))}
      </ul>
      <button onClick={increase}>sort salary increasing</button>
      <button onClick={decrease}>sort salary decreasing</button>
      <button onClick={dept1}>dept 1</button>
      <button onClick={dept2}>dept 2</button>
      <button onClick={dept3}>dept 3</button>
      <button onClick={all}>all</button>
    </div>
  );
}

export default App;
