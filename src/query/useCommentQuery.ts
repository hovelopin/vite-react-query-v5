import { useQuery } from '@tanstack/react-query';
import jsonApi from '../apis';

const useCommentQuery = () => {
  const commentQuery = useQuery(['comment'], jsonApi.getCommentList);

  return commentQuery;
};

export default useCommentQuery;
