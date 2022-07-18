import React from 'react';
import { useUpdateTask } from '../hooks/updateTask';

const TaskList = ({ task, refetch }) => {
  const onCompleted = () => {
    refetch();
  };
  const id = task?.id;
  const { updateTask } = useUpdateTask(onCompleted);
  const handleChangeStatus = async (e) => {
    const selectedValue = e.target.value;
    updateTask(id, selectedValue);
  };

  return (
    <div>
      <span>{task?.name}</span>
      <select
        defaultValue={task?.status}
        onChange={handleChangeStatus}
        name="status"
        id="status"
      >
        <option value="DONE">DONE</option>
        <option value="TODO">TODO</option>
      </select>
    </div>
  );
};

export default TaskList;
