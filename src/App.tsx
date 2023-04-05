import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import Home from './pages';
import QueryErrorBoundary from './query/error/QueryErrorBoundary';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <QueryErrorBoundary>
          <Suspense fallback={<div>...loading</div>}>
            <Home />
          </Suspense>
        </QueryErrorBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;
