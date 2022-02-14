import React, { useState } from "react";
import style from "./ProductInput.module.css";

function ProductInput(props) {
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
    props.handleSubmit(data);
  };
  return (
    <form onSubmit={formHandler} className={style.container}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={data.name}
          name="title"
          onChange={onchangeHandler}
        ></input>
      </div>
      <div>
        <label>Cost</label>
        <input
          type="number"
          value={data.age}
          name="cost"
          onChange={onchangeHandler}
        ></input>
      </div>
      <div>
        <label>Image</label>
        <input
          type="url"
          value={data.salary}
          name="image"
          onChange={onchangeHandler}
        ></input>
      </div>
      <div>
        <label>Category</label>
        <select value={data.name} name="category" onChange={onchangeHandler}>
          <option>vegetables</option>
          <option>fruits</option>
          <option>provisions</option>
        </select>
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default ProductInput;
