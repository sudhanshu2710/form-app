import React, { useState } from "react";

function Input(props) {
  const [data, setData] = useState({});
  const onchangeHandler = (e) => {
    let { name, value, type, checked } = e.currentTarget;
    value = type === "checkbox" ? checked : value;
    setData({
      ...data,
      [name]: value,
    });
  };
  const formHandler = (e) => {
    e.preventDefault();
    console.log(data);
    // let data_ = {
    //   book: book,
    //   author: aut,
    //   comments: [comment],
    // };
    fetch(`http://localhost:8000/posts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json;charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("done");
        props.update();
      })
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={formHandler}>
      <label>name</label>
      <input
        type="text"
        value={data.name}
        name="fName"
        onChange={onchangeHandler}
      ></input>
      <label>Age</label>
      <input
        type="text"
        value={data.age}
        name="age"
        onChange={onchangeHandler}
      ></input>
      <label>Salary</label>
      <input
        type="text"
        value={data.salary}
        name="salary"
        onChange={onchangeHandler}
      ></input>
      <label>Department</label>
      <select value={data.name} name="department" onChange={onchangeHandler}>
        <option>department 1</option>
        <option>department 2</option>
        <option>department 3</option>
      </select>
      <label>marital status</label>
      <input
        type="checkbox"
        value={data.isMarried}
        name="isMarried"
        onChange={onchangeHandler}
      ></input>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default Input;
