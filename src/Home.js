import TaskList from './components/TaskList';
import FormTask from './components/FormTask';
import { useTasks } from './hooks/useTask';
function Home() {
  const { data, error, refetch } = useTasks();

  if (error) {
    alert('Load error!');
  }

  return (
    <div className="App">
      <h2>Add Task</h2>
      <FormTask refetch={refetch} />
      <hr />
      <h2>Todo</h2>
      {data?.tasks
        .filter((task) => task.status === 'TODO')
        .map((task) => (
          <TaskList key={task?.id} refetch={refetch} task={task} />
        ))}
      <h2>Done</h2>
      {data?.tasks
        .filter((task) => task.status === 'DONE')
        .map((task) => (
          <TaskList key={task?.id} refetch={refetch} task={task} />
        ))}
    </div>
  );
}

export default Home;
