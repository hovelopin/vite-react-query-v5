import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import WithError from '../../../components/WithError';
import CommentFallbackRender from '../render/CommentRenderFallback';

export default function CommentErrorBoundary({ children }: { children: React.ReactNode }) {
  const { reset } = useQueryErrorResetBoundary();
  const WithCommentFallbackRender = WithError(CommentFallbackRender);

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <WithCommentFallbackRender resetErrorBoundary={resetErrorBoundary} errors={error} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
