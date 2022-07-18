import { useQuery, gql } from '@apollo/client';

const GET_TASK_QUERY = gql`
  query getTask {
    tasks {
      id
      name
      status
      dueDate
    }
  }
`;

export const useTasks = () => {
  const { loading, error, data, refetch } = useQuery(GET_TASK_QUERY);

  return {
    data,
    error,
    loading,
    refetch,
  };
};
