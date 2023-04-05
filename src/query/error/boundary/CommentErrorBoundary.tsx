import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import PhotoFallbackRender from '../render/PhotoFallbackRender';

export default function CommentErrorBoundary({ children }: { children: React.ReactNode }) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <PhotoFallbackRender resetErrorBoundary={resetErrorBoundary} error={error} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
