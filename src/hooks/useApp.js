import * as React from "react";
import { useQuery, useLazyQuery, useMutation, gql } from "@apollo/client";

const GET_TASKS = gql`
  query getTasks($where: TaskFilter) {
    tasks(where: $where, orderBy: createdAt_DESC) {
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
  const [searchedName, setSearchedName] = React.useState("");
  const [searchedStatus, setSearchedStatus] = React.useState("TODO");

  const { loading, error, data } = useQuery(GET_TASKS);
  const [searchTasks, { data: dataSearchTasks }] = useLazyQuery(GET_TASKS);

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
        refetchQueries: [{ query: GET_TASKS }],
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
        refetchQueries: [{ query: GET_TASKS }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchTasks = (e) => {
    e.preventDefault();

    searchTasks({
      variables: {
        where: {
          name_contains: searchedName,
          status: searchedStatus,
        },
      },
      fetchPolicy: "cache-and-network",
    });
  };

  const todoTasks = data?.tasks?.filter((item) => item.status === "TODO") ?? [];
  const doneTasks = data?.tasks?.filter((item) => item.status === "DONE") ?? [];
  const searchedTasks = dataSearchTasks?.tasks ?? [];

  return {
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
  };
};
