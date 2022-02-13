import React from "react";

import style from "./TaskList.module.css";
export const TaskList = (props) => {
  const deleteTask = (e) => {
    props.removeTask(props.Id);
  };

  return (
    <div className={style.container}>
      <div>{props.fName}</div>
      <div>{props.salary}</div> <div>{props.department}</div>
      <div>{props.isMarried ? "yes" : "no"}</div>
      <button className={style.btn} onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
};
