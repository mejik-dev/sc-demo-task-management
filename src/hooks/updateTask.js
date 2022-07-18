import { useMutation, gql } from '@apollo/client';

const UPDATE_TASK_QUERY = gql`
  mutation updateTask($id: String!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
    }
  }
`;

export const useUpdateTask = (onCompleted) => {
  const [updateTask, { data, loading, error }] = useMutation(
    UPDATE_TASK_QUERY,
    {
      onCompleted,
    }
  );

  return {
    data,
    error,
    loading,
    updateTask: (id, status) => {
      updateTask({
        variables: {
          id,
          input: {
            status,
          },
        },
      });
    },
  };
};
