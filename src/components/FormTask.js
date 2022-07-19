import * as React from "react";

const FormTask = ({ onSubmit, setName }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g Reading"
      />
      <button>Add Task</button>
    </form>
  );
};

export default FormTask;
