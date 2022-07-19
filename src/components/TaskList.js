import * as React from "react";

const TaskList = ({ task, onChange, onClick }) => {
  const handleChangeStatus = (e) => {
    onChange(task.id, e.target.value);
  };

  const handleDeleteTask = () => {
    onClick(task.id);
  };

  return (
    <li>
      <span className="list">{task.name}</span>
      <select
        id="status"
        name="status"
        defaultValue={task.status}
        onChange={handleChangeStatus}
      >
        <option value="DONE">DONE</option>
        <option value="TODO">TODO</option>
      </select>
      <button className="button-delete" onClick={handleDeleteTask}>
        ❌
      </button>
    </li>
  );
};

export default TaskList;
