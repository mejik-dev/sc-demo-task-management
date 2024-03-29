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
    handleSearchTasks,
    handleUpdateTask,
    handleDeleteTask,
    setName,
    setSearchedName,
    setSearchedStatus,
  } = useApp();

  return (
    <div className="App">
      <h2>Search Tasks</h2>
      <form onSubmit={handleSearchTasks}>
        <div className="form">
          <input
            type="search"
            onChange={(e) => setSearchedName(e.target.value)}
            placeholder="e.g Reading"
          />
          <select
            id="status"
            name="status"
            defaultValue="TODO"
            onChange={(e) => setSearchedStatus(e.target.value)}
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="TODO">TODO</option>
            <option value="DONE">DONE</option>
          </select>
          <button type="submit">Search</button>
        </div>
      </form>
      <hr />
      {error ? (
        <p>Something when wrong while fetching the data...</p>
      ) : (
        <>
          {loading ? (
            <p>Loading, please wait...</p>
          ) : (
            <>
              <h3>Todo</h3>
              <ul>
                {todoTasks.map((item) => (
                  <TaskList
                    key={item.id}
                    task={item}
                    onChange={handleUpdateTask}
                    onClick={handleDeleteTask}
                  />
                ))}
              </ul>
              {!todoTasks.length && <p>Empty task</p>}
              <h3>Done</h3>
              <ul>
                {doneTasks.map((item) => (
                  <TaskList
                    key={item.id}
                    task={item}
                    onChange={handleUpdateTask}
                    onClick={handleDeleteTask}
                  />
                ))}
              </ul>
              {!doneTasks.length && <p>Empty task</p>}
            </>
          )}
        </>
      )}
      <h2>Add Task</h2>
      <FormTask onSubmit={handleCreateTask} setName={setName} />
      <hr />
    </div>
  );
};

export default App;
