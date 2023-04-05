import { useQuery } from '@tanstack/react-query';
import jsonApi from '../apis';

const usePhotoQuery = () => {
  const photoQuery = useQuery(['photo'], jsonApi.getAll);

  return photoQuery;
};

export default usePhotoQuery;
