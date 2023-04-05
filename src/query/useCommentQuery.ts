import { useQuery } from '@tanstack/react-query';
import jsonApi from '../apis';

const useCommentQuery = () => {
  const commentQuery = useQuery(['comment'], jsonApi.getCommentList, {
    suspense: true,
    retry: 0,
    staleTime: 3000,
  });

  return commentQuery;
};

export default useCommentQuery;
