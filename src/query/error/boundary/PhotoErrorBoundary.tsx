import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import WithError from '../../../components/WithError';
import PhotoFallbackRender from '../render/PhotoFallbackRender';

const PhotoErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();
  const WithPhotoFallbackRender = WithError(PhotoFallbackRender);

  return (
    <ErrorBoundary
      // ErrorBoundary에서 Capture된 에러를 초기화시켜주기 위해 reset을 호출한다.
      // Reset the state of your app so the error doesn't happen again
      onReset={reset}
      // Error가 났을때 보여줄 UI를 넘겨준다. 이때 , resetErrorBoundary를 넘겨줘서 데이터를 받아오기 위해 다시 시도한다.
      fallbackRender={({ error, resetErrorBoundary }) => (
        <WithPhotoFallbackRender resetErrorBoundary={resetErrorBoundary} errors={error} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default PhotoErrorBoundary;
