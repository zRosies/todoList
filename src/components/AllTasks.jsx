import React, { useState } from "react";
import {BsTrashFill} from "react-icons/bs";
import {MdDoneOutline} from "react-icons/md"
import {BiSolidEdit} from "react-icons/bi"



const AllTasks = ({ todo, toggleComplete, handleDelete, handleEdit}) => {
  const [newTodo, setNewTodo] = useState(todo.todoType);
  const [newCategory, setNewCategory] = useState(todo.categoryType);

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleCategory = (e) => {
    setNewCategory(e.target.value);
  };

  return (
    <>
      <div className="answ">
        <div className="category">
          <input
            style={{ textDecoration: todo.completed && "line-through" }}
            type="text"
            value={newTodo}
            className="list"
            onChange={handleChange}
          />

          <select
            style={{ textDecoration: todo.completed && "line-through" }}
            value={newCategory}
            className="list"
            onChange={handleCategory}
          >
            <option value="Select a category">Select a category</option>
            <option value="Study">Study</option>
            <option value="Personal development">Personal development</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="buttons">
          <button
            className="edit"
            onClick={() => handleEdit(todo, newTodo, newCategory)}
          >
            <BiSolidEdit id="edit" />
          </button>
          <button
            className="buttonComplete"
            onClick={() => toggleComplete(todo)}
          >
            <MdDoneOutline id="done" />
          </button>
          <button className="thrash" onClick={() => handleDelete(todo.id)}>
            <BsTrashFill id="trash" />
          </button>
        </div>
      </div>
    </>
  );
};
  
  export default AllTasks;