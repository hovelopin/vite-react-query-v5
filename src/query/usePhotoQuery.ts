import { useQuery } from '@tanstack/react-query';
import jsonApi from '../apis';

const usePhotoQuery = () => {
  const photoQuery = useQuery(['photo'], jsonApi.getAll, {
    suspense: true,
    staleTime: 3000,
    retry: 0,
  });

  return photoQuery;
};

export default usePhotoQuery;
