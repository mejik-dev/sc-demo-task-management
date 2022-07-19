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
    searchedTasks,
    todoTasks,
    handleCreateTask,
    handleSearchTasks,
    handleUpdateTask,
    setName,
    setSearchedName,
    setSearchedStatus,
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
              <h3>Todo</h3>
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
              <h3>Done</h3>
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
      <hr />
      <h2>Search Tasks</h2>
      <form onSubmit={handleSearchTasks}>
        <div className="form">
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => setSearchedName(e.target.value)}
            placeholder="e.g Reading"
          />
          <label>Status:</label>
          <select
            id="status"
            name="status"
            defaultValue="TODO"
            onChange={(e) => setSearchedStatus(e.target.value)}
          >
            <option value="DONE">DONE</option>
            <option value="TODO">TODO</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>
      <hr />
      <p>Found {searchedTasks.length} data</p>
      <ul>
        {searchedTasks.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
