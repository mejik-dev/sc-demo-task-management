import "./App.css";

import * as React from "react";
import TaskList from "./components/TaskList";
import FormTask from "./components/FormTask";
import { useApp } from "./hooks/useApp";

const App = () => {
  const {
    doneTasks,
    error,
    loading,
    todoTasks,
    handleCreateTask,
    handleUpdateTask,
    setName,
  } = useApp();

  return (
    <div className="App">
      <h2>Add Task</h2>
      <FormTask onSubmit={handleCreateTask} setName={setName} />
      <hr />
      {error ? (
        <p>Something when wrong while fetching the data...</p>
      ) : (
        <>
          {loading ? (
            <p>Loading, please wait...</p>
          ) : (
            <>
              <h2>Todo</h2>
              <ul>
                {todoTasks.map((item) => (
                  <TaskList
                    key={item.id}
                    task={item}
                    onChange={handleUpdateTask}
                  />
                ))}
              </ul>
              {!todoTasks.length && <p>Empty task</p>}
              <h2>Done</h2>
              <ul>
                {doneTasks.map((item) => (
                  <TaskList
                    key={item.id}
                    task={item}
                    onChange={handleUpdateTask}
                  />
                ))}
              </ul>
              {!doneTasks.length && <p>Empty task</p>}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
