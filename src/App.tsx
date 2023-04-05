import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        suspense: true,
        staleTime: 3000,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </>
  );
}

export default App;
