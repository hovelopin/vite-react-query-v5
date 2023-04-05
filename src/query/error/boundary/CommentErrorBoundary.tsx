import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import CommentFallbackRender from '../render/CommentRenderFallback';

export default function CommentErrorBoundary({ children }: { children: React.ReactNode }) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <CommentFallbackRender resetErrorBoundary={resetErrorBoundary} error={error} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
