import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import PhotoFallbackRender from './PhotoFallbackRender';

const QueryErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      // ErrorBoundary에서 Capture된 에러를 초기화시켜주기 위해 reset을 호출한다.
      onReset={reset}
      // Error가 났을때 보여줄 UI를 넘겨준다. 이때 , resetErrorBoundary를 넘겨줘서 데이터를 받아오기 위해 다시 시도한다.
      fallbackRender={({ error, resetErrorBoundary }) => (
        <PhotoFallbackRender resetErrorBoundary={resetErrorBoundary} error={error} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default QueryErrorBoundary;
