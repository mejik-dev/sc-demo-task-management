import * as React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const TASKS = gql`
  {
    tasks(orderBy: createdAt_DESC) {
      id
      name
      status
    }
  }
`;
const CREATE_TASK = gql`
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      name
      status
    }
  }
`;
const UPDATE_TASK = gql`
  mutation updateTask($id: String!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
    }
  }
`;

export const useApp = () => {
  const [name, setName] = React.useState("");

  const { loading, error, data } = useQuery(TASKS);

  const [createTask] = useMutation(CREATE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  const handleCreateTask = async () => {
    try {
      await createTask({
        variables: {
          input: {
            name,
            status: "TODO",
          },
        },
        refetchQueries: [{ query: TASKS }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (id, status) => {
    try {
      await updateTask({
        variables: {
          id,
          input: { status },
        },
        refetchQueries: [{ query: TASKS }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const todoTasks = data?.tasks?.filter((item) => item.status === "TODO") ?? [];
  const doneTasks = data?.tasks?.filter((item) => item.status === "DONE") ?? [];

  return {
    doneTasks,
    error,
    loading,
    todoTasks,
    handleCreateTask,
    handleUpdateTask,
    setName,
  };
};
