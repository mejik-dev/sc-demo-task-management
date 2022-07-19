import * as React from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';

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
  const [name, setName] = React.useState('');
  const [searchedName, setSearchedName] = React.useState('');
  const [searchedStatus, setSearchedStatus] = React.useState('TODO');

  const { loading, error, data } = useQuery(GET_TASKS);
  const [searchTasks, { data: dataSearchTasks }] = useLazyQuery(GET_TASKS);

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
            status: 'TODO',
          },
        },
        refetchQueries: [{ query: GET_TASKS }],
      });

      e.target.reset();
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

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask({
        variables: { id },
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
      fetchPolicy: 'cache-and-network',
    });

    e.target.reset();
  };

  const todoTasks = data?.tasks?.filter((item) => item.status === 'TODO') ?? [];
  const doneTasks = data?.tasks?.filter((item) => item.status === 'DONE') ?? [];
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
    handleDeleteTask,
    setName,
    setSearchedName,
    setSearchedStatus,
  };
};
