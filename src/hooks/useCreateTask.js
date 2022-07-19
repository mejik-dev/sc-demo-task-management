import { useMutation, gql } from "@apollo/client";

const CREATE_TASK_QUERY = gql`
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      name
      status
    }
  }
`;

export const useCreateTask = (onCompleted) => {
  const [createTask, { data, loading, error }] = useMutation(
    CREATE_TASK_QUERY,
    {
      onCompleted,
    }
  );

  return {
    data,
    error,
    loading,

    createTask: (input) => {
      createTask({
        variables: { input },
      });
    },
  };
};
