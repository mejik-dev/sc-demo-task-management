import * as React from "react";

const TaskList = ({ task, onChange }) => {
  const handleChangeStatus = (e) => {
    onChange(task.id, e.target.value);
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
    </li>
  );
};

export default TaskList;
