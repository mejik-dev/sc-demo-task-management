import * as React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_TASKS = gql`
  query GetTasks($where: TaskFilter) {
    tasks(where: $where, orderBy: createdAt_DESC) {
      id
      name
      status
    }
  }
`;
const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`;
const UPDATE_TASK = gql`
  mutation UpdateTask($id: String!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
    }
  }
`;
const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const useApp = () => {
  const [name, setName] = React.useState("");
  const [searchedName, setSearchedName] = React.useState("");
  const [searchedStatus, setSearchedStatus] = React.useState("TODO");

  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: {
      where: {
        name_contains: "",
        status_in: ["TODO", "DONE"],
      },
    },
  });

  const [createTask] = useMutation(CREATE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        variables: {
          input: {
            name,
            status: "TODO",
          },
        },
        refetchQueries: [
          {
            query: GET_TASKS,
            variables: {
              where: {
                name_contains: searchedName,
                status_in: [searchedStatus],
              },
            },
          },
          {
            query: GET_TASKS,
            variables: {
              where: {
                name_contains: "",
                status_in: ["TODO", "DONE"],
              },
            },
          },
        ],
      });
      e.target.reset();
      setName("");
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
        refetchQueries: [
          {
            query: GET_TASKS,
            variables: {
              where: {
                name_contains: searchedName,
                status_in: [status],
              },
            },
          },
          {
            query: GET_TASKS,
            variables: {
              where: {
                name_contains: "",
                status_in: ["TODO", "DONE"],
              },
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask({
        variables: { id },
        refetchQueries: [
          {
            query: GET_TASKS,
            variables: {
              where: {
                name_contains: searchedName,
                status_in: [searchedStatus],
              },
            },
          },
          {
            query: GET_TASKS,
            variables: {
              where: {
                name_contains: "",
                status_in: ["TODO", "DONE"],
              },
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchTasks = (e) => {
    e.preventDefault();

    refetch({
      where: {
        name_contains: searchedName,
        status_in: searchedName ? [searchedStatus] : ["TODO", "DONE"],
      },
    });
  };

  const todoTasks = data?.tasks?.filter((item) => item.status === "TODO") ?? [];
  const doneTasks = data?.tasks?.filter((item) => item.status === "DONE") ?? [];

  return {
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
  };
};
