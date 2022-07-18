import React from 'react';
import { useCreateTask } from '../hooks/useCreateTask';

const FormTask = ({ refetch }) => {
  const onCompleted = () => {
    refetch();
  };

  const { createTask, error } = useCreateTask(onCompleted);
  const [name, setName] = React.useState('');
  const [status, setStatus] = React.useState('TODO');

  const handleSubmitTask = (e) => {
    e.preventDefault();
    createTask({
      name,
      status,
    });

    if (error) {
      alert('Error update Data!');
    }
  };

  return (
    <form onSubmit={handleSubmitTask}>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="nama task"
      />
      <button>Add Task</button>
    </form>
  );
};

export default FormTask;
