import { useQuery } from '@tanstack/react-query';
import photo from '../apis/photo';

const useCommentQuery = () => {
  const commentQuery = useQuery(['comment'], photo.getCommentList, {
    suspense: true,
    retry: 0,
    staleTime: 3000,
  });

  return commentQuery;
};

export default useCommentQuery;
