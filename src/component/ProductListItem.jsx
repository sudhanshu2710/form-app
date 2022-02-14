import React from "react";

import style from "./TaskList.module.css";
export const ProductListItem = (props) => {
  const deleteTask = (e) => {
    props.removeTask(props.id);
  };

  return (
    <div className={style.container}>
      <div>{props.title}</div>
      <div>{props.cost}</div>
      <div>
        <img src={props.image} />
      </div>
      <div>{props.category}</div>
      <button className={style.btn} onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
};
