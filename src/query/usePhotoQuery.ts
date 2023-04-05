import { useQuery } from '@tanstack/react-query';
import photo from '../apis/photo';

const usePhotoQuery = () => {
  const photoQuery = useQuery(['photo'], photo.getAll, {
    suspense: true,
    staleTime: 3000,
    retry: 0,
  });

  return photoQuery;
};

export default usePhotoQuery;
